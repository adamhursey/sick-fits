import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import deleteFromCart from './deleteFromCart';

// fake graphql tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
      deleteFromCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      deleteFromCart,
    },
  },
});
