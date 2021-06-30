import { useState, useEffect } from "react";

const useUserProfile = (idUser, token) => {
  const [user, setUser] = useState({});

  //listar usuario
  const cargarUsuario = async () => {
    const res = await fetch(`http://localhost:3030/usuario/${idUser}`, {
      headers: { Authorization: token },
    });
    const fetchedUser = await res.json();
    setUser(fetchedUser.userInfo);
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  return user;
};

export default useUserProfile;
