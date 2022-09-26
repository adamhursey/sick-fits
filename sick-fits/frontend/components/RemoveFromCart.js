import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const DELETE_ITEM_FROM_CART_MUTATION = gql`
  mutation DELETE_ITEM_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

function update(cache, payload) {
  cache.evict({ id: cache.identify(payload.data.deleteCartItem) });
}

export default function RemoveFromCart({ id }) {
  const [deleteCartItem, { loading }] = useMutation(
    DELETE_ITEM_FROM_CART_MUTATION,
    {
      variables: { id },
      update,
      optimisticResponse: {
        deleteCartItem: {
          id,
          __typename: 'CartItem',
        },
      },
    }
  );

  return (
    <BigButton
      type="button"
      title="remove this item from cart"
      onClick={deleteCartItem}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string,
};
