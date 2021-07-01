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
  const [likes] = useLikes(id);
  const [dislikes] = useDislikes(id);

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
    if (res.ok) history.go();
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
    if (res.ok) history.go();
  };

  return (
    <div className="ficha_noticia" onClick={goToNoticia}>
      <div className="puntuacion_container">
          {(likes || likes === 0) && (dislikes || dislikes === 0) && (
            <div className="puntuacion">{likes - dislikes}</div>
          )}
           {decodedToken.id === userId && <i className="fas fa-trash fa-lg delete" title="Borrar" onClick={deleteNoticia} />}
      </div>
      <div className="content_and_votes_container">
            <div className="content">
              <NoticiaBody titulo={titulo} descripcion={descripcion} enlace={enlace} />
              <div className="content_author_info">
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
              </div>

            </div>

            <div className="votes">
              <div className="votes_likes">
                <i className="fas fa-check fa-lg like" title="Like" onClick={likeNoticia} />
                {likes}
              </div>
              <div className="votes_dislikes">
               <i className="fas fa-times fa-lg disLike" title="Dislike" onClick={dislikeNoticia} />
                {dislikes}
              </div>
            </div>
           
      </div>
    </div>
  );
};

export default FichaNoticia;
