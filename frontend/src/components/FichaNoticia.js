import { useContext } from 'react';
import NoticiaBody from './NoticiaBody';
import { TokenContext } from './TokenContextProvider';
import { useHistory } from 'react-router-dom';
import decodeTokenData from '../utils/decodeTokenData';
import defaultAvatar from '../multimedia/defaultAvatar.png';
import useLikes from '../hooks/useLikes';
import useDislikes from '../hooks/useDislikes';

const FichaNoticia = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const { id, userId, titulo, descripcion, enlace, imagen, nombre } = props;
  const history = useHistory();
  const [likes, setLikes] = useLikes(id);
  const [dislikes, setDislikes] = useDislikes(id);

  const goToNoticia = (e) => {
    e.stopPropagation();
    history.push(`/noticia/${id}`);
  };

  const deleteNoticia = async (e) => {
    const res = await fetch(`http://localhost:3030/noticia/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });

    if (res.ok) history.push('/');
  };

  const likeNoticia = async (e) => {
    e.stopPropagation();
    const res = await fetch(`http://localhost:3030/noticia/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ voto: 1 }),
    });
    if (res.ok) setLikes(likes + 2);
  };
  const dislikeNoticia = async (e) => {
    e.stopPropagation();
    const res = await fetch(`http://localhost:3030/noticia/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ voto: 0 }),
    });
    if (res.ok) setDislikes(dislikes + 2);
  };

  return (
    <div className="puntuacion" onClick={goToNoticia}>
      {(likes || likes === 0) && (dislikes || dislikes === 0) && (
        <div className="boton_temperatura_noticia">{likes - dislikes}</div>
      )}

      <div className="ficha">
        <NoticiaBody titulo={titulo} descripcion={descripcion} enlace={enlace} />
        {imagen ? (
          <img
            className={'avatar'}
            src={`http://localhost:3030/uploads/avatares/${imagen}`}
            alt={`Avatar de ${nombre}`}
          />
        ) : (
          <img className={'avatar'} src={defaultAvatar} alt={`Avatar de ${nombre}`} />
        )}
        <p>{nombre}</p>
        {decodedToken.id === userId && <i className="fas fa-trash fa-lg" title="Borrar" onClick={deleteNoticia} />}
      </div>

      <div className="botones">
        <i className="fas fa-check fa-lg like" title="Like" onClick={likeNoticia} />
        <i className="fas fa-times fa-lg disLike" title="Dislike" onClick={dislikeNoticia} />
      </div>
    </div>
  );
};

export default FichaNoticia;
