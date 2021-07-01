import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect } from "react-router-dom";
import useNoticias from "../hooks/useNoticias";
import ListFichas from "../components/ListaFichas";

const Inicio = (props) => {
  const [token] = useContext(TokenContext);
  const noticias = useNoticias();
  return (
    <>
      {token ? (
        <div className="home_page">
          {noticias.length > 0 && <ListFichas noticias={noticias} />}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Inicio;
