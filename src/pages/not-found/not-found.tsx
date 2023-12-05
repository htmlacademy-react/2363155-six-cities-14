import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

export default function NotFound () : JSX.Element {
  return (
    <div
      style={
        {
          paddingTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }
      }
    >
      <Helmet>
        <title>6 cities: 404</title>
      </Helmet>
      <h1>404: Not Found</h1>
      <Link to='/' style={{color: 'blue'}}>Back to main page</Link>
    </div>
  );
}
