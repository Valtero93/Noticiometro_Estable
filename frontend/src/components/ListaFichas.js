import FichaNoticia from './FichaNoticia';

const ListFichas = (props) => {
  const { noticias } = props;

  const arrayFichas = noticias.map((noticia) => (
    <FichaNoticia
      key={noticia.id}
      id={noticia.id}
      userId={noticia.userId}
      titulo={noticia.titulo}
      descripcion={noticia.descripcion}
      enlace={noticia.enlace}
      imagen={noticia.imagen}
      nombre={noticia.nombre}
      puntuacion={noticia.puntuacion}
    ></FichaNoticia>
  )); // [<Message msg={OBJETOMENSAJE1}, <Message msg={OBJETOMENSAJE2},  <Message msg={OBJETOMENSAJE3}]

  return <ul className="lista_fichas">{arrayFichas}</ul>;
};

export default ListFichas;
