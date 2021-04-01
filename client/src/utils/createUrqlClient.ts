import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import {
  LoginMutation, LogoutMutation,

  MeDocument, MeQuery,


  RegisterMutation
} from '../generated/graphql';
import { updateQuery } from './updateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: process.env.API_URL ? `${process.env.API_URL}/graphql` : 'http://localhost:8000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            updateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            updateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result?.login?.errors) {
                  return query;
                } else {
                  return {
                    me: result?.login?.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            updateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result?.register?.errors) {
                  return query;
                } else {
                  return {
                    me: result?.register?.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
