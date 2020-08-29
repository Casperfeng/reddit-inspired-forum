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
    >
      <Box mx={'5px'} color='gray'>
        <img src='/images/logo/reddit_clone.png' alt='project logo' />
      </Box>
      <Box mx={'30px'} display='flex' justifyContent='space-around'>
        {NavLinks.map((link: NavLink, index: number) => (
          <Box key={index} mr={'15px'} color='gray'>
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
