import { Link, Redirect } from 'react-router-dom';
import { TokenContext } from '../components/TokenContextProvider';
import { useContext } from 'react';

const NoLogin = (props) => {
  const [token] = useContext(TokenContext);
  return (
    <>
      {!token ? (
        <div className="no_login_container">
          <div className="no_login">
            <div className="no_login_title">
              <h2>Lo siento no tienes permisos</h2>
              <p>Regístrate para ver el contenido</p>
            </div>
            <div className="no_login_buttons">
              <Link className="no_login_buttons_register" to="/register">
                Registro
              </Link>
              <Link className="no_login_buttons_login" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};

export default NoLogin;
