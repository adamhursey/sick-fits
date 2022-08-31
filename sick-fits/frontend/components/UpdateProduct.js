import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  query UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product
  const {
    selectProductData,
    selectProductError,
    selectProductLoading,
  } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  if (selectProductLoading) return <p>Loading...</p>;
  if (selectProductError) return <p>Error: {selectProductError.message}</p>;
  console.log(selectProductData);
  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
  });
  // 3. We need the form to handle the updates
  return <p>Update {updateData.Product.name}!</p>;
}
