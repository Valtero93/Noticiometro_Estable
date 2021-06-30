import { useState, useEffect } from 'react';

const useLikes = (idNoticia) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const cargarLikes = async () => {
      const res = await fetch(`http://localhost:3030/noticia/${idNoticia}/likes`);
      const fetchedLikes = await res.json();
      if (res.ok) {
        setLikes(fetchedLikes.data[0].likes);
      }
    };

    cargarLikes();
  }, [idNoticia]);

  return likes;
};

export default useLikes;
