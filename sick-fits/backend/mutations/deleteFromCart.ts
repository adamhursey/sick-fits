/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemUpdateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function deleteFromCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemUpdateInput> {
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


  if (existingCartItem.quantity>1) {
    console.log(
      `there ${existingCartItem.quantity} in the cart decrease by 1`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity -1 },
    });
  }
  // If there is only one then delete the item
  return await context.lists.CartItem.deleteOne({ id: productId })
}
