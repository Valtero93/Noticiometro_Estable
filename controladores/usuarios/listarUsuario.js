const { conexionDB } = require("../../db");

async function listarUsuario(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    //OBTENEMOS ID DE REQ.PARAMS - ES UN STRING
    const { id } = req.params;

    let usuario;
    //OBTENEMOS DATOS USUARIO DE BASE DE DATOS
    try {
      [usuario] = await connection.query(
        `
            SELECT *
            FROM usuarios
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("no se ha podido obtener usuario");
    }

  
    if (usuario.length < 1) {
      throw new Error("el usuario no existe en la base de datos");
    }

    // QUE INFORMACION VAMOS A MOSTRAR A LOS EXTRANJEROS

    usuario = usuario[0]
    const userInfo = { 
      nombre: usuario.nombre,
      fechaRegistro: usuario.fechaRegistro,
      imagen: usuario.imagen
    }
    if (usuario.id === Number(req.auth.id) || req.auth.rol === "admin"){
      userInfo.email = usuario.email
      userInfo.rol = usuario.rol
    }
    res.send({
      status: "ok",
      userInfo
    });

    //

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listarUsuario };
