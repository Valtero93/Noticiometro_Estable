const { conexionDB } = require("../../db");

async function borrarNoticia(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();
    const { id } = req.params;

    try {
      //BORRAMOS NOTICIAS DE LA BASE DE DATOS

      await connection.query(
        `
            DELETE 
            FROM votos
            WHERE id_noticia=?
            `,
        [id]
      );
      
      await connection.query(
        `
            DELETE 
            FROM noticias
            WHERE id=?
            `,
        [id]
      );

     
    } catch (error) {
      throw new Error("No se pudo borrar la noticia de la base de datos");
    }

    res.send({
      status: "ok",
      message: "Noticia borrada satisfactoriamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { borrarNoticia };
