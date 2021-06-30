import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";

const RegisterPage = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      {!token ? (
        <div>
          <h2 style={{ fontWeight: "600" }}>Registro</h2>
          <RegisterForm />
          <p>
            ¿Ya tienes cuenta?
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Haz login
            </Link>
          </p>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default RegisterPage;
