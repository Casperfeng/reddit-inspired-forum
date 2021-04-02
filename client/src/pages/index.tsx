import { withUrqlClient } from 'next-urql';
import React from 'react';
import Navbar from '../components/Navbar';
import { Post, usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

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
