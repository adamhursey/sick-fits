import useForm from '../lib/useForm';

export default function CreateProduct(props) {
  const { inputs, handleChange } = useForm({
    name: 'Nice Shoes',
    price: 1000,
    description: 'These are the best shoes',
  });
  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder={0}
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
