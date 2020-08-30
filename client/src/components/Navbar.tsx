import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import NavLinks, { NavLink } from '../fixtures/NavLinks';
import { useMeQuery } from '../generated/graphql';

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  let authenticated: boolean | null = null;

  if (fetching) {
  } else if (!data?.me) {
    authenticated = false;
  } else {
    authenticated = true;
  }
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      h={'80px'}
    >
      <Box mx={'9px'} color='gray'>
        <NextLink href='/'>
          <Link>
            <img src='/images/logo/reddit_clone.png' alt='project logo' />
          </Link>
        </NextLink>
      </Box>
      <Box mx={'30px'} display='flex' justifyContent='space-around'>
        {authenticated !== null &&
          NavLinks.map(
            (link: NavLink, index: number) =>
              (!link.auth || authenticated) && (
                <Box key={index} mr={'15px'} color='gray'>
                  <NextLink href={link.linkTo}>
                    <Link>{link.label}</Link>
                  </NextLink>
                </Box>
              )
          )}
      </Box>
    </Box>
  );
};

export default Navbar;
