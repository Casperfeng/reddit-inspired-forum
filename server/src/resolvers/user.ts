import argon2 from 'argon2';
import {
  Arg,
  Ctx, Mutation,
  Query, Resolver
} from 'type-graphql';
import { getConnection } from 'typeorm';
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

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return { errors: [
        {
          field: "newPassword",
          message: "length must be greater than 2"
        }
      ]}
    }
    
    const redisKey = `${FORGET_PASSWORD_PREFIX}/${token}`;

    const userId = await redis.get(redisKey);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "invalid or expired token"
          }
        ]
      }
    }

    const id = parseInt(userId);

    const user = await User.findOne(id);

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user does not exist"
          }
        ]
      }
    }
    await User.update(
      {id}, 
      { password: await argon2.hash(newPassword)}
    );
    
    await redis.del(redisKey);

    req.session!.userId = user.id;
    return { user };
  }



  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string, @Ctx() { redis }: MyContext) {
    const user = await User.findOne({where: { email }});
    if (!user) {
      return true;
    }
    const token = uuid();
    const redisKey = `${FORGET_PASSWORD_PREFIX}/${token}`;
    redis.set(redisKey, user.id, 'ex', 1000 * 60 * 60 * 24 * 3);
    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">Reset password</a>`
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    const userId = !req.session!.userId;
    if (!userId) {
      return null;
    }
    return User.findOne({ id: req.session!.userId });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection().createQueryBuilder().insert().into(User).values(
        {username: options.username,
        email: options.email,
        password: hashedPassword
        }
      ).returning('*').execute();
      user = result.raw[0];
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
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      User,
      !usernameOrEmail.includes('@')
        ?  { where: { username: usernameOrEmail }}
        : { where: {
            email: usernameOrEmail,
          }}
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
