const { conexionDB } = require("../db");

async function canEdit(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    // Sacamos la id de la entrada de req.params;
    const { id } = req.params;

    // Seleccionamos la entrada
    const [result] = await connection.query(
      `
      SELECT id_usuario
      FROM noticiometro
      WHERE id=?
    `,
      [id]
    );

    // Si no tenemos resultados devolvemos un error de que la entrada no existe
    if (result.length < 1) {
      throw new Error("La entrada no existe");
    }

    // Compruebo que el usuario del token es el que creo la entrada del diario
    // a la que le estamos añadiendo la foto

    const entry = result[0];

    if (req.auth.id !== entry.id_usuario && req.auth.rol !== "admin") {
      throw new Error("No realizar esta acción sobre esta entrada de diario");
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  canEdit,
};
