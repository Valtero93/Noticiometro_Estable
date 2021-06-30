import { Link, Redirect } from 'react-router-dom';
import { TokenContext } from '../components/TokenContextProvider';
import { useContext } from 'react';

const NoLogin = (props) => {
  const [token] = useContext(TokenContext);
  return (
    <>
      {!token ? (
        <div className="no_login">
          <Link to="/register">¡Regístrate!</Link>
          <Link to="/login">Haz login</Link>
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};

export default NoLogin;
