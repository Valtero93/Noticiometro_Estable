const { conexionDB } = require("../../db");

async function borrarUsuario(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();
    const { id } = req.params;

    if (Number(id) === 1) {
      throw new Error("El usuario administrador no se puede borrrar");
    }

    try {
      //BORRAMOS USUARIO DE LA BASE DE DATOS
      await connection.query(
        `
            DELETE 
            FROM usuarios
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("No se pudo borrar el usuario de la base de datos");
    }

    res.send({
      status: "ok",
      message: "Usuario borrado satisfactoriamente"
    });
    
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { borrarUsuario };