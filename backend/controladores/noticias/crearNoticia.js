const { conexionDB } = require("../../db");

async function crearNoticia(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    // compruebo que recibo los datos necesarios (noticia)
    const { titulo, descripcion, enlace } = req.body;

    if (!titulo) {
      throw new Error('Por lo menos debes incluír el campo "Título"');
    }

    // Meto la entrada en la base de datos
    const [result] = await connection.query(
      `
      INSERT INTO noticias(fecha, descripcion, titulo, enlace , id_user , ultimoCambio )
      VALUES(?,?,?,?,?,utc_timestamp)
    `,
      [new Date(), descripcion, titulo, enlace, req.auth.id]
    );

    // Devuelvo información
    res.send({
      status: "ok",
      message: "Nueva noticia añadida",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { crearNoticia };
