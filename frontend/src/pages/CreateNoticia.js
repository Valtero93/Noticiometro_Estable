import { useState, useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { useHistory } from "react-router-dom";

const CreateNoticia = (props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enlace, setEnlace] = useState("");
  const [token] = useContext(TokenContext);
  const history = useHistory();

  const createNoticia = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3030/noticia", {
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: token },
      body: JSON.stringify({ titulo, descripcion, enlace }),
    });

    const body = await res.json();

    if (res.ok) history.push(`/noticia/${body.id}`);
  };
  return (
    <div className="page_container">
      <div className="page_container_title">
        <h2>Crear noticia</h2>
      </div>

      <div className="page_container_content">
      <form className="page_content_form" onSubmit={createNoticia}>
        <div className="inputWrapper">
          <label htmlFor="titulo">Título:</label>
          <input
            type="titulo"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          ></input>
        </div>
        <div className="inputWrapper">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="descripcion"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></input>
        </div>
        <div className="inputWrapper">
          <label type="url" htmlFor="enlace">
            Enlace:
          </label>
          <input
            type="enlace"
            id="enlace"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
            required
          ></input>
        </div>

        <input type="submit" value="Crear noticia"></input>
      </form>
      </div>
    </div>
  );
};

export default CreateNoticia;
