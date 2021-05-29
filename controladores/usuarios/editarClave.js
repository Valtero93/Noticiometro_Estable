const { conexionDB } = require("../../db");
const bcrypt = require("bcrypt");

async function editarClave(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    const { oldPassword, newPassword, newPassword2 } = req.body;

    const { id } = req.params;

    if (newPassword !== newPassword2) {
      throw new Error("La nueva contraseña no coincide");
    }

    //OBTENGO USUARIO EN BASE AL ID DE LA RUTA
    let existingUser;
    try {
      [existingUser] = await connection.query(
        `
            SELECT *
            FROM usuarios
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("No se pudo buscar al usuario en la base de datos");
    }

    //OBTENGO LA CONTRASEÑA CODIFICADA DEL USUARIO EN LA BASE DE DATOS
    const passwordCoded = existingUser[0].password;

    //COMPARAMOS LA CONTRASEÑA DEL USUARIO DEL BODY CON LA DE LA BASE DE DATOS
    try {
      const isValid = await bcrypt.compare(oldPassword, passwordCoded);
      if (isValid === false) {
        throw new Error(
          "La contraseña introducida no coincide con la depositada en base de datos"
        );
      }
    } catch (error) {
      throw new Error("no se han podido comparar");
    }

    let passwordDb;
    try {
      passwordDb = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      throw new Error("la contraseña no se pudo codificar");
    }

    try {
      await connection.query(
        `
            UPDATE usuarios
            SET password=?
            WHERE id=?
            `,
        [passwordDb, id]
      );
    } catch (error) {
      throw new Error("el usuario no se pudo actualizar");
    }

    res.send("contraseña actualizada");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editarClave };
