import { TokenContext } from "../components/TokenContextProvider";
import { useContext, useState, useRef } from "react";
import decodeTokenData from "../utils/decodeTokenData";
import useUserProfile from "../hooks/useUserProfle";
import { Redirect, useHistory } from "react-router-dom";
import defaultAvatar from "../multimedia/defaultAvatar.png";

const Perfil = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const user = useUserProfile(decodedToken.id, token);
  const avatarInput = useRef();

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre || user.nombre);
    formData.append("email", email || user.email);
    if (avatarInput.current.files[0]) {
      formData.append("picture", avatarInput.current.files[0]);
    }

    const res = await fetch(
      `http://localhost:3030/usuario/${decodedToken.id}`,
      {
        method: "PUT",
        headers: { Authorization: token },
        body: formData,
      }
    );
    if (res.ok) history.go();
  };

  return (
    <>
      {token ? (
        <div className="profilePage">
          <h2>PERFIL</h2><br />
          {Object.keys(user).length > 0 && (
            <form onSubmit={updateUser}>
              <br />
              <label htmlFor="avatar">
                {user.imagen ? (
                  <img
                    className={"avatar"}
                    src={`http://localhost:3030/uploads/avatares/${user.imagen}`}
                    alt={`Avatar de ${user.nombre}`}
                  />
                ) : (
                  <img
                    className={"avatar"}
                    src={defaultAvatar}
                    alt={`Avatar de ${user.nombre}`}
                  />
                )}
              </label>
              <input
                ref={avatarInput}
                type="file"
                id="avatar"
                style={{ display: "none" }}
                accept="image/*"
                onChange={updateUser}
              />

              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                placeholder={user.nombre}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input type="submit" value="Guardar cambios" />
            </form>
          )}
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </>
  );
};

export default Perfil;
