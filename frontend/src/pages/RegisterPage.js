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
          <h2 className="colorito2" style={{ fontWeight: "600" }}>
            &nbsp;&nbsp;&nbsp;Registro
          </h2>
          <RegisterForm />
          <p>
            &nbsp;&nbsp;&nbsp;¿Ya tienes cuenta?&nbsp;
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
