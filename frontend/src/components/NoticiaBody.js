const Noticia = (props) => {
  const { titulo, descripcion, enlace } = props;

  return (
    <div className="ficha_notica">
      <a href={enlace}>{enlace}</a>

      <h1>{titulo}</h1>
      <p>{descripcion}</p>
    </div>
  );
};

export default Noticia;
