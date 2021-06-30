const { conexionDB } = require('../../db');

async function getNoticia(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    // compruebo que recibo los datos necesarios (noticia)
    const { id } = req.params;
    console.log(id);
    // Meto la entrada en la base de datos
    const [result] = await connection.query(
      `
      SELECT n.id, n.titulo,n.descripcion,n.enlace,u.id userId,u.imagen,u.nombre
      FROM noticias n left join usuarios u on n.id_user=u.id
      where n.id=?
      `,
      [id]
    );
    console.log(id);

    if (result.length < 1) {
      throw new Error('La entrada no existe');
    }

    // Devuelvo información

    res.send({
      status: 'ok',
      message: 'Noticia recibida',
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { getNoticia };
