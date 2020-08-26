import React from 'react';
import { Box } from '@chakra-ui/core';

interface Props {}

const Wrapper: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Wrapper;
