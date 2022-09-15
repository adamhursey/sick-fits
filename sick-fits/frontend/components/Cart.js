import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { CURRENT_USER_QUERY, useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

const DELETE_ONE_FROM_CART_MUTATION = gql`
  mutation DELETE_ONE_FROM_CART_MUTATION($id: ID!) {
    deleteOneFromCart(productId: $id) {
      id
    }
  }
`;

const DELETE_ITEM_FROM_CART_MUTATION = gql`
  mutation DELETE_ITEM_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  const [deleteOneFromCart] = useMutation(DELETE_ONE_FROM_CART_MUTATION, {
    variables: { id: product.id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [deleteCartItem] = useMutation(DELETE_ITEM_FROM_CART_MUTATION, {
    variables: { id: cartItem.id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  if (!product) return null;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
        <button type="button" onClick={deleteOneFromCart}>
          Remove 1
        </button>
        <button type="button" onClick={deleteCartItem}>
          Remove All
        </button>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
