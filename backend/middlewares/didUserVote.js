const { conexionDB } = require('../db');

async function didUserVote(req, res, next) {
  let connection;

  try {
    connection = await conexionDB();

    const { idNoticia } = req.params;
    const idUser = req.auth.id;
    const { voto } = req.body;

    const [result] = await connection.query(
      `
      SELECT COUNT(voto) likes FROM votos WHERE voto = ? AND id_noticia = ? AND id_user = ?;
    `,
      [voto, idNoticia, idUser]
    );

    if (result[0].likes) {
      console.log('WTF');
      throw new Error('Ya has votado');
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  didUserVote,
};
