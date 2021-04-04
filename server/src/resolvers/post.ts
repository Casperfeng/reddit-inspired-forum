import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '../entities/Post';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';


@InputType()
class PostInput {
  @Field()
  title: string
  @Field()
  text: string
}


@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg('id') id: number
  ): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() {req}: MyContext
  ): Promise<Post> {
    return Post.create({... input, creatorId: req.session!.userId}).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('title', () => String, { nullable: true }) title: string,
    @Arg('id') id: number,
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }

    if (typeof title !== 'undefined'){
      await Post.update({ id }, {title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePostById(
    @Arg('id') id: number,
  ): Promise<boolean> {
    try {
      await Post.delete(id);
    } catch (e) {
      return false;
    }
    return true;
  }
}
