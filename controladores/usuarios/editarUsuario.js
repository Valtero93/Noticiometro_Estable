const { subirImagen } = require("../../helpers");
const { conexionDB } = require("../../db");

async function editarUsuario(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    const { nombre, email } = req.body;

    if (!email) {
      throw new Error("El campo email es obligatorio");
    }

    if (req.files) {
      //GESTIONAR SUBIDA DE IMAGENES
      let nombreArchivo;
      try {
        nombreArchivo = await subirImagen({
          file: req.files.picture,
          directory: "avatares",
        });
      } catch (error) {
        throw new Error("No se ha podido subir la imagen");
      }

      //ACTUALIZO EL USUARIO
      try {
        await connection.query(
          `
                UPDATE usuarios
                SET nombre=?,
                email=?,
                imagen=?
                WHERE id=?
                `,
          [nombre, email, nombreArchivo, req.auth.id]
        );
      } catch (error) {
        throw new Error("Ha habido un error al actualizar tu usuario");
      }
    } else {
      try {
        await connection.query(
          `
                UPDATE usuarios
                SET nombre=?,
                email=?
                WHERE id=?
                `,
          [nombre, email, req.auth.id]
        );
      } catch (error) {
        throw new Error("Ha habido un error al actualizar tu usuario");
      }
    }
    res.send("tu usuario ha sido actualizo satisfactoriamente");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editarUsuario };