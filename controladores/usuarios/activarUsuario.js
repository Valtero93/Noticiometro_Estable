const { conexionDB } = require("../../db");

async function activarUsuario(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    const { codigoRegistro } = req.params;

    // COMPROBAR QUE EXISTA USUARIO CON ESE CÓDIGO DE ACTIVACION
    let usuario;

    try {
      [usuario] = await connection.query(
        `
            SELECT *
            FROM usuarios
            WHERE codigoRegistro = ?
            `,
        [codigoRegistro]
      );
    } catch (error) {
      new Error("No existe un usuario con este codigoRegistro");
    }

    
    // EMITIMOS ERROR SI NO EXISTE CABECERA DE AUTORIZACIÓN
    if (!codigoRegistro) {
      throw new Error("No existe codigoRegistro por lo tanto no podemos validar el usuario");
    }


    //COMPROBAR QUE EL USUARIO EXISTA EN LA BASE DE DATOS
    const [usuariodb] = await connection.query(
        `
         SELECT id
         FROM usuarios
         WHERE codigoRegistro=?
         `,
        [codigoRegistro]
      );

    // SI NO EXISTE, LANZO ERROR
    if (usuariodb.length < 1) {
      throw new Error("No hay usuario pendientes de validar con este codigo");
    }
    await connection.query(
      `
       UPDATE usuarios
       SET activo=true, codigoRegistro=NULL
       WHERE codigoRegistro=?
       `,
      [codigoRegistro]
    );
    
      res.send({
      status: "ok",
      message: "Usuario activado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  activarUsuario,
};
