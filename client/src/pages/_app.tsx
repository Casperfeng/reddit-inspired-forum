import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
import theme from '../theme';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
){
  return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

const client = createClient({
  url: process.env.API_URL ? process.env.API_URL : 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, MeQuery>(
            cache,
            {query: MeDocument},
            _result,
            () => ({ me: null })
          )
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, MeQuery>(cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              if (result.login!.errors) {
                return query
              } else {
                return {
                  me: result.login!.user
                }
              }

            })
        },
        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, MeQuery>(cache,
            {query: MeDocument},
            _result,
            (result, query) => {
              if (result.register!.errors) {
                return query
              } else {
                return {
                  me: result.register!.user
                }
              }

            })
        }
      }
    }
  }), fetchExchange]
})


function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
