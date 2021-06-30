const { conexionDB } = require('../../db');

async function getNoticias(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    // compruebo que recibo los datos necesarios (noticia)
    // Meto la entrada en la base de datos
    const [result] = await connection.query(
      `
      SELECT n.id, n.titulo,n.descripcion,n.enlace,u.id userId,u.imagen,u.nombre
      FROM noticias n left join usuarios u on n.id_user=u.id
      GROUP BY n.id
      `
    );

    if (result.length < 1) {
      throw new Error('No hay noticias');
    }

    // Devuelvo información

    res.send({
      status: 'ok',
      message: 'Noticias recibidas',
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getNoticias };
