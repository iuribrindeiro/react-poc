import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    ssrMode: true,
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

export default client;