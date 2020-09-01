import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <>
      <Navbar />
      <div>Hello World</div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
