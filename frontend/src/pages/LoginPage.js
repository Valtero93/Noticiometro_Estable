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
          <h2 style={{ fontWeight: "600" }}>Login</h2>
          <LoginForm />
          <p>
            ¿No tienes cuenta?
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
