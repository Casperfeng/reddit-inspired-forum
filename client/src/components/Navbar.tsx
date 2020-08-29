import React from 'react';
import { Box } from '@chakra-ui/core';

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      h={'80px'}
      bg='apple'
    >
      <Box mx={'5px'}>Logo</Box>
      <Box mx={'30px'}>NavLinks</Box>
    </Box>
  );
};

export default Navbar;
