import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post';

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
  async createPost(
    @Arg('title') title: string
  ): Promise<Post> {
    return Post.create({title}).save();
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
