import { useHistory } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfle";
import defaultAvatar from "../multimedia/defaultAvatar.png";
import { TokenContext } from "../components/TokenContextProvider";
import { useContext } from "react";
import decodeTokenData from "../utils/decodeTokenData";

const Avatar = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const user = useUserProfile(decodedToken?.id, token);
  const history = useHistory();
  const irAPerfil = (e) => {
    e.stopPropagation();
    history.push("/perfil");
  };
  return (
    <>
      {user && Object.keys(user).length > 0 && (
        <div className="ficha_avatar" onClick={irAPerfil}>
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
          <h3>{user.nombre}</h3>
        </div>
      )}
    </>
  );
};

export default Avatar;
