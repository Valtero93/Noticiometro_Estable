import { useState, useEffect } from 'react';

const useNoticias = () => {
  const [noticias, setNoticias] = useState([]);

  //listar usuario
  const cargarNoticias = async () => {
    const res = await fetch(`http://localhost:3030/noticias`);
    const fetchedNoticia = await res.json();
    if (res.ok) {
      setNoticias(fetchedNoticia.data);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  return noticias;
};

export default useNoticias;
