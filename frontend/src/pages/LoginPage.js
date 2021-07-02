import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";
import React from "react";

const LoginPage = (props) => {
  const [token] = useContext(TokenContext);
  return (
    <>
      {!token ? (
        <div>
          <h2 className="colorito" style={{ fontWeight: "600" }}>
            &nbsp;&nbsp;&nbsp;Login
          </h2>
          <LoginForm />
          <p className="muevete">
            &nbsp;&nbsp;&nbsp;¿No tienes cuenta?&nbsp;
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Regístrate
            </Link>
          </p>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default LoginPage;
