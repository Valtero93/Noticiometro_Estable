import { useParams } from "react-router-dom";
import FichaNoticia from "../components/FichaNoticia";
import useNoticiaById from "../hooks/useNoticiaById";

const NoticiaPage = (props) => {
  const { id } = useParams();
  const noticia = useNoticiaById(id);
  console.log("noticia", noticia);
  return (
    <div className="noticiaPage">
      {Object.keys(noticia).length > 0 && (
        <FichaNoticia
          id={noticia.id}
          userId={noticia.userId}
          titulo={noticia.titulo}
          descripcion={noticia.descripcion}
          enlace={noticia.enlace}
          imagen={noticia.imagen}
          nombre={noticia.nombre}
          puntuacion={noticia.puntuacion}
        ></FichaNoticia>
      )}
    </div>
  );
};
export default NoticiaPage;
