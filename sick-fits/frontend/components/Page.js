import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <>
      <Header />
      <h1>I am the page comp</h1>
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
