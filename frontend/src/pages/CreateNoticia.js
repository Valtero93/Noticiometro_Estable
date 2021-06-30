import { useState, useContext } from 'react';
import { TokenContext } from '../components/TokenContextProvider';
import { useHistory } from 'react-router-dom';

const CreateNoticia = (props) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enlace, setEnlace] = useState('');
  const [token] = useContext(TokenContext);
  const history = useHistory();

  const createNoticia = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3030/noticia', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
      body: JSON.stringify({ titulo, descripcion, enlace }),
    });

    const body = await res.json();

    if (res.ok) history.push(`/noticia/${body.id}`);
  };
  return (
    <div className="createPage">
      <form onSubmit={createNoticia}>
        <label htmlFor="titulo">Título:</label>
        <input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required></input>
        <label htmlFor="descripcion">Descripción:</label>
        <input id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
        <label type="url" htmlFor="enlace">
          Enlace:
        </label>
        <input id="enlace" value={enlace} onChange={(e) => setEnlace(e.target.value)} required></input>
        <input type="submit" value="Crear noticia"></input>
      </form>
    </div>
  );
};

export default CreateNoticia;
