import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <>
      <h1>I am the page comp</h1>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
