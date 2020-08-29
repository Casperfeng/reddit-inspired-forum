import React from 'react';
import { Box } from '@chakra-ui/core';

interface Props {
  size?: 'small' | 'default';
}

const Wrapper: React.FC<Props> = ({ children, size = 'default' }) => {
  return (
    <Box
      mt={8}
      maxW={size === 'default' ? '850px' : '450px'}
      w='100%'
      mx='auto'
    >
      {children}
    </Box>
  );
};

export default Wrapper;
