import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import NavLinks, { NavLink } from '../fixtures/NavLinks';

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      h={'80px'}
      bg='steelblue'
    >
      <Box mx={'5px'} color='white'>
        Logo
      </Box>
      <Box mx={'30px'} display='flex' justifyContent='space-around'>
        {NavLinks.map((link: NavLink, index: number) => (
          <Box key={index} mx={'7px'} color='white'>
            <NextLink href={link.linkTo}>
              <Link>{link.label}</Link>
            </NextLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
