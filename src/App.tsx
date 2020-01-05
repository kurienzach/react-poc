import React from 'react';
import styles from './App.module.css';
import Header from './widgets/header/Header';
import DataSourcesContainer from './containers/data-sources/DataSourcesContainer';
import SageBarContainer from './containers/sage-bar/SageBarContainer';
import DataSourcesGqlContainer from './containers/data-sources/DataSourcesGql';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import {getTables} from './containers/data-sources/data-sources-service';

const typeDefs = gql`
    type Source {
        id: Int!
        name: String!
        columns: [String!]
        isOpen: Boolean
    }

    type DataSourceState {
        loading: Boolean!
        sources: [Source!]
    }

    extend type Query {
        getSources: [Source!]
    }
`;

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    typeDefs,
    resolvers: {
      Mutation: {
        toggleTodo: (_root, variables, { cache, getCacheKey }) => {
          const id = getCacheKey({ __typename: 'TodoItem', id: variables.id })
          const fragment = gql`
            fragment completeTodo on TodoItem {
              completed
            }
          `;
          const todo = cache.readFragment({ fragment, id });
          const data = { ...todo, completed: !todo.completed };
          cache.writeData({ id, data });
          return null;
        },
        getSources: async (_root, variables, { cache, getCacheKey }) => {
            await cache.writeData({
                data: {
                    dataSources: {
                        __typename: 'DataSourceState',
                        loading: true,
                    },
                },
            });
            let sources = await getTables()
            sources = sources.map((source: any) => ({...source, __typename: 'Source'}));
            console.log(sources);
            await cache.writeData({
                data: {
                    dataSources: {
                        __typename: 'DataSourceState',
                        loading: false,
                        sources
                    }
                }
            })
            return null;
        },
      },
    },
  });

cache.writeData({
    data: {
        dataSources: {
            __typename: 'DataSourceState',
            loading: false,
            sources: [],
        }
    }
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className={styles.app}>
                <Header />
                <div className={styles.content}>
                    <DataSourcesGqlContainer/>
                    {/* <DataSourcesContainer />
                    <SageBarContainer /> */}
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;
