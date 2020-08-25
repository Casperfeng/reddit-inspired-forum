import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
} from 'type-graphql';
import { MyContext } from 'src/types';
import { User } from '../entities/User';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const hashedPwd = await argon2.hash(options.password);
    const user = await em.create(User, {
      username: options.username.toLowerCase(),
      password: hashedPwd,
    });
    await em.persistAndFlush(user);
    return { user };
  }

  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username.toLowerCase(),
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'username does not exist',
          },
        ],
      };
    }
    const hashedPwd = await argon2.hash(options.password);
    const valid = await argon2.verify(hashedPwd, options.password);

    if (!valid) {
      return { errors: [{ field: 'password', message: 'incorrect password' }] };
    }
    return { user };
  }
}
