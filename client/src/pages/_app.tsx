import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { LoginMutation, MeDocument, MeQuery } from '../generated/graphql';
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
