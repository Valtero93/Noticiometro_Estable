const { conexionDB } = require("../../db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { enviarMail } = require("../../helpers");

async function crearUsuario(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    //OBTENER LOS DATOS DE LA REQUEST
    const { email, password, nombre } = req.body;

    //COMPROBAR QUE LOS DATOS EXISTAN
    if (!email || !password) {
      throw new Error("Faltan datos para crear un usuario");
    }

    let usuario;
    //comprobar que no exista un usuario con el mismo email

    [usuario] = await connection.query(
      `
            SELECT *
            FROM usuarios
            WHERE email=?
            `,
      [email]
    );

    //si el resultado de la consulta anterior es mayor que uno
    //hay coincidencia, por lo tanto, emito un error
    if (usuario.length > 0) {
      throw new Error("Ya existe un usuario en la base de datos");
    }

    //CODIFICAR PASSWORD
    const passwordDb = await bcrypt.hash(password, 10);

    //CREAR CÓDIGO DE REGISTRO PARA FUTURA ACTIVACIÓN
    const codigoRegistro = crypto.randomBytes(20).toString("hex").slice(0, 20);

    //INTRODUCIRLOS EN LA BASE DE DATOS
    await connection.query(`
            INSERT INTO usuarios(
                fechaRegistro,
                email,
                password,
                nombre,
                codigoRegistro,
                ultimoCambio,
                lastAuthUpdate
                )
            VALUES(
                UTC_TIMESTAMP,
                "${email}",
                "${passwordDb}",
                "${nombre}",
                "${codigoRegistro}",
                UTC_TIMESTAMP,
                UTC_TIMESTAMP
            )
            `);

    //ENVIO DE EMAIL DE CONFIRMACIÓN DE CREACIÓN DE USUARIO
    const linkValidacion = `${process.env.DOMINIO}/activar/${codigoRegistro}`;

    await enviarMail({
      to: email,
      subject: "Te acabas de registrar en NOTICIOMETRO",
      message: `
            Muchas gracias por registrarte en Noticiometro,
            pulsa el siguiente link para activar tu usuario:

            ${linkValidacion}
          `,
    });

    res.send({
      status: "ok",
      message: "Usuario creado con éxito",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { crearUsuario };
