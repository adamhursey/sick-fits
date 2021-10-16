import { useState } from 'react';

export default function useForm(initial = {}) {
  // Create state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    setInputs({
      // Copy existing state
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  // Return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
  };
}
