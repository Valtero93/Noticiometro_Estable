const { conexionDB } = require('../../db');

async function getLikes(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    const { idNoticia } = req.params;

    // compruebo que recibo los datos necesarios (noticia)
    // Meto la entrada en la base de datos
    const [result] = await connection.query(
      `
      SELECT COUNT(voto) likes FROM votos WHERE voto = 1 AND id_noticia = ?
      `,
      idNoticia
    );

    // Devuelvo información

    res.send({
      status: 'ok',
      message: `Likes de la noticia ${idNoticia}`,
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getLikes };
