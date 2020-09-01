import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/core';
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
    <Flex
      alignItems='center'
      justifyContent='space-between'
      h={'80px'}
      zIndex={1}
      position='sticky'
      top={0}
    >
      <Box mx={'9px'} color='gray'>
        <NextLink href='/'>
          <Link>
            <img src='/images/logo/reddit_clone.png' alt='project logo' />
          </Link>
        </NextLink>
      </Box>
      <Flex mx={'30px'} justifyContent='space-around'>
        {authenticated && data?.me && (
          <Box mr={'15px'}>Hello, {data.me?.username}!</Box>
        )}
        {authenticated !== null &&
          NavLinks.map(
            (link: NavLink, index: number) =>
              !link.auth &&
              !authenticated && (
                <Box key={index} mr={'15px'} color='gray'>
                  <NextLink href={link.linkTo}>
                    <Link>{link.label}</Link>
                  </NextLink>
                </Box>
              )
          )}
        {authenticated && (
          <Box mr={'15px'} color='gray'>
            <Button variant='link'>Logout</Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
