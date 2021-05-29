const { conexionDB } = require("../../db");
const bcrypt = require("bcrypt");

async function restablecerClave(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    const { code } = req.params;
    const { password, confirmPassword } = req.body;

    let existingUser;
    try {
      [existingUser] = await connection.query(
        `
            SELECT *
            FROM usuarios
            WHERE codigoRegistro = ?
            `,
        [code]
      );
    } catch (error) {
      throw new Error("No se pudo buscar usuario en la base de datos");
    }

    if (existingUser.length < 1) {
      throw new Error(
        "No existe usuario en la base de datos con ese código para resetear su contraseña"
      );
    }

    if (password !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    //CODIFICO LA CONTRASEÑA
    let passwordDb;
    try {
      passwordDb = await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error("la contraseña no se pudo codificar");
    }

    //ACTUALIZO EL USUARIO EN LA BASE DE DATOS

    try {
      await connection.query(
        `
            UPDATE usuarios
            SET password=?, codigoRegistro=NULL
            WHERE codigoRegistro=?
            `,
        [passwordDb, code]
      );
    } catch (error) {
      throw new Error("No se pudo actualizar la contraseña");
    }

    res.send("llega al final");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { restablecerClave };
