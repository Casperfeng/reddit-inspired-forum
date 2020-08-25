import { Resolver, Mutation, Arg, InputType, Field, Ctx } from 'type-graphql';
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

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<User> {
    const hashedPwd = await argon2.hash(options.password);
    const user = await em.create(User, {
      username: options.username,
      password: hashedPwd,
    });
    await em.persistAndFlush(user);
    return user;
  }
}
