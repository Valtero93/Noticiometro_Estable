const { conexionDB } = require('../../db');
const { deleteLikes } = require('./deleteLikes');
const { deleteDislikes } = require('./deleteDislikes');

async function votar(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    const idUser = req.auth.id;
    const { idNoticia } = req.params;
    const { voto } = req.body;

    if (!voto && voto !== 0) {
      throw new Error('Se debe incluir un voto');
    }

    if (voto === 1) {
      deleteDislikes(idNoticia, idUser);
    }

    if (voto === 0) {
      console.log('EEEEEEEH');
      deleteLikes(idNoticia, idUser);
    }

    // Meto la entrada en la base de datos
    const [result] = await connection.query(
      `
      INSERT INTO votos(voto, fecha, id_user, id_noticia )
      VALUES(?,utc_timestamp,?,?)
    `,
      [voto, idUser, idNoticia]
    );

    // Devuelvo información
    res.send({
      status: 'ok',
      message: 'Has votado la noticia!',
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { votar };
