import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect } from "react-router-dom";
import useNoticias from "../hooks/useNoticias";
import ListFichas from "../components/ListaFichas";

const Inicio = (props) => {
  const [token, setToken] = useContext(TokenContext);
  const noticias = useNoticias();
  return (
    <>
      {token ? (
        <>
          {noticias.length > 0 && <ListFichas noticias={noticias} />}
          <button
            className="botonSalir"
            onClick={() => setToken("")}
            style={{ backgroundColor: "#ef627a", zIndex: "999" }}
          >
            Sign out
          </button>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Inicio;
