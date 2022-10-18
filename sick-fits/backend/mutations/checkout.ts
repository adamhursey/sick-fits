/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';

const graphql = String.raw;

interface Arguments {
  token: string
}


async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // Make sure they are signed in
  const userId = context.session.itemId
  if(!userId){
    throw new Error('Sorry! You must be signed in to create an order')
  }
  //  query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `
  });
  console.dir(user, { depth: null })

  // Calculate the total price
  // create the payment with the stripe library
  // convert the cart items to order items
  // create the order and return it
}
