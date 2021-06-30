import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

export default function ValidateUser() {
  const { code } = useParams();
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    const doValidation = async () => {
      const res = await fetch(`http://localhost:3000/activar/${code}`);

      if (res.ok) {
        history.push("/login");
      } else {
        setError("Error validando usuario");
      }
    };

    doValidation();
  }, [code, setError, history]);

  return error ? <p>{error}</p> : null;
}
