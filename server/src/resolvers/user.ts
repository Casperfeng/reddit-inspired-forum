import { EntityManager } from '@mikro-orm/postgresql';
import argon2 from 'argon2';
import {
  Arg,
  Ctx, Mutation,
  Query, Resolver
} from 'type-graphql';
import { v4 as uuid } from 'uuid';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { sendEmail } from '../utils/sendEmail';
import { validateRegister } from '../utils/validateRegister';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { UserResponse } from './UserResponse';

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string, @Ctx() { em, redis }: MyContext) {
    const user = await em.findOne(User, { email });
    if (!user) {
      return true;
    }

    const token = uuid();

    redis.set(`${FORGET_PASSWORD_PREFIX}/${token}`, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session!.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session!.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('*');
      user = result[0];
    } catch (err) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'username or email already taken',
          },
        ],
      };
    }

    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(
      User,
      !usernameOrEmail.includes('@')
        ? { username: usernameOrEmail }
        : {
            email: usernameOrEmail,
          }
    );

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'username or email does not exist',
          },
        ],
      };
    }
    const hashedPwd = await argon2.hash(password);
    const valid = await argon2.verify(hashedPwd, password);

    if (!valid) {
      return { errors: [{ field: 'password', message: 'incorrect password' }] };
    }

    req.session!.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
