import { Resolver, Mutation, Arg, InputType, Field, Ctx } from 'type-graphql';
import { MyContext } from 'src/types';
import { User } from 'src/entities/User';

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
    const user = await em.create(User, { username: options.username });
    await em.persistAndFlush(user);
    return user;
  }
}
