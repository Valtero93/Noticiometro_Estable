import { Link } from "react-router-dom";
import sideBarLogo from "../multimedia/logo_web.svg";
import Avatar from "./Avatar";

const Sidebar = () => {
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
            <i className="fas fa-user" title="Ajustes"></i>
          </Link>
        </li>
        <li>
          <Avatar />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
