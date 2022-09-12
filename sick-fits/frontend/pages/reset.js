import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Sorry you must supply token</p>
        <RequestReset />
      </>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
