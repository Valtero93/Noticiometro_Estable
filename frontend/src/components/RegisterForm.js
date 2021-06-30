import { useState, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";

const RegisterForm = (props) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3030/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setError("");
      setDone(true);
      // setToken(data.accessToken);
    } else {
      setError(data.error);
    }
  };

  if (done)
    return (
      <p>
        Usuario creado correctamente ... mira tu email para completar el
        registro
      </p>
    );
  return (
    <div className="wrapper">
      <div className="grid">
        <form className="form register" id="register" onSubmit={register}>
          <div className="form__field">
            <label htmlFor="registerName">nombre</label>
            <input
              type="text"
              id="registerName"
              name="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="registerEmail">Email</label>
            <input
              type="email"
              id="registerEmail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="registerPassword">Contraseña</label>
            <input
              type="password"
              id="registerPassword"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input type="submit" value="Enviar" />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
