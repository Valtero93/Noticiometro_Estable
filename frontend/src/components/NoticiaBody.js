const Noticia = (props) => {
  const { titulo, descripcion, enlace } = props;

  return (
    <div className="content_body">
      <a href={enlace} className="url">
        {enlace.slice(0, 30) + "..."}
      </a>

      <h1>{titulo}</h1>
      <p>{descripcion}</p>
    </div>
  );
};

export default Noticia;
