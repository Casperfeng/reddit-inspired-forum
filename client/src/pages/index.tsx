import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery, Post } from '../generated/graphql';
import Navbar from '../components/Navbar';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      Hello World!
      <br />
      {!data
        ? null
        : data.posts.map((post: Post) => <div key={post.id}>{post.title}</div>)}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
