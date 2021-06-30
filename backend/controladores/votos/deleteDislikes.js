const { conexionDB } = require('../../db');

async function deleteDislikes(idNoticia, idUser) {
  let connection;

  try {
    connection = await conexionDB();

    await connection.query(
      `
      DELETE FROM votos WHERE voto = 0 AND id_noticia = ? AND id_user = ?
      `,
      [idNoticia, idUser]
    );
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteDislikes };
