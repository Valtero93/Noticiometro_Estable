import { useState, useEffect } from "react";

const useNoticiaById = (idNoticia) => {
  const [noticia, setNoticia] = useState({});

  //listar usuario
  const cargarNoticia = async () => {
    const res = await fetch(`http://localhost:3030/noticia/${idNoticia}`);
    const fetchedNoticia = await res.json();
    console.log(fetchedNoticia);
    if (res.ok) {
      setNoticia(fetchedNoticia.data);
    }
  };

  useEffect(() => {
    cargarNoticia();
  }, []);

  return noticia;
};

export default useNoticiaById;
