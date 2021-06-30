import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TokenContext } from "./TokenContextProvider";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setError("");
      setToken(data.token);
      history.push("/");
    } else {
      setError(data.error);
    }
  };
  return (
    <div className="wrapper">
      <div className="grid">
        <form className="form login" id="login" onSubmit={login}>
          <div className="form__field">
            <label htmlFor="loginEmail">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__field">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Enviar" />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
