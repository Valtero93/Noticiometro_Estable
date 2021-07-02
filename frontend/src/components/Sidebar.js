import { Link } from "react-router-dom";
import sideBarLogo from "../multimedia/logo_web.svg";
import useUserProfile from "../hooks/useUserProfle";
import defaultAvatar from "../multimedia/defaultAvatar.png";
import { TokenContext } from "../components/TokenContextProvider";
import { useContext } from "react";
import decodeTokenData from "../utils/decodeTokenData";

const Sidebar = () => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const [, setToken] = useContext(TokenContext);
  const user = useUserProfile(decodedToken?.id, token);

  return (
    <nav className="col-1">
      <img
        className="centrar"
        src={sideBarLogo}
        alt="Estrella SVG"
        width="85"
      />
      <ul className="sidebar_links_list">
        <li>
          {/* <NavLink to="/recientes">
            <i className="fas fa-home fa-lg" title="Inicio"></i>
          </NavLink> */}
          <Link to="/home">
            <i className="fas fa-home fa-lg" title="Inicio"></i>
          </Link>
        </li>
        <li>
          <Link to="/noticia/create">
            <i className="fas fa-plus fa-lg" title="Añadir noticia"></i>
          </Link>
        </li>
        <li>
          <Link to="/perfil">
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
          </Link>
        </li>
        <li>
          <button className="botonSalir" onClick={() => setToken("")}>
            SALIR
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
