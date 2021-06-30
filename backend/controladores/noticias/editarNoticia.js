const { conexionDB } = require("../../db");

async function editarNoticia(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    const { id } = req.params;

    // Comprobamos que en el body vienen todos los datos necesarios
    const { titulo, descripcion, enlace } = req.body;

    // Actualizamos la entrada
    await connection.query(
      `
      UPDATE noticias
      SET titulo=?, descripcion=?,enlace=?, fecha=?
      WHERE id=?
    `,
      [titulo, descripcion, enlace, new Date(), id]
    );

    // devolvemos una respuesta

    res.send({
      status: "ok",
      message: `La noticia con id ${id} fue actualizada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editarNoticia };
