/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // Query current user to see if signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this');
  }
  // Query the current users cart.
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });

  const [existingCartItem] = allCartItems;


  if (existingCartItem) {
    console.log(
      `there are already ${existingCartItem.quantity} in the cart increment by 1`
    );
    // See if the item they are adding is already in their cart
    // if it is, increment by 1,
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // if it isn't create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
          // quantity: existingCartItem.quantity
        }
      },
      user: {
        connect: {
          id: sesh.itemId
        }
      }
    }
  })
}
