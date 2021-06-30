import { useState, useEffect } from 'react';

const useDislikes = (idNoticia) => {
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const cargarDislikes = async () => {
      const res = await fetch(`http://localhost:3030/noticia/${idNoticia}/dislikes`);
      const fetchedLikes = await res.json();
      if (res.ok) {
        setDislikes(fetchedLikes.data[0].dislikes);
      }
    };

    cargarDislikes();
  }, [idNoticia]);

  return dislikes;
};

export default useDislikes;
