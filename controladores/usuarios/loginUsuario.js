const { conexionDB } = require("../../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function loginUsuario(req, res, next) {
  let connection;
  try {
    connection = await conexionDB();

    //OBTENEMOS DATOS DEL BODY DE LA PETICIÓN
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Faltan datos de acceso");
    }

    let usuario;
    //OBTENEMOS DATOS DE USUARIO
    try {
      [usuario] = await connection.query(
        `
            SELECT *
            FROM usuarios
            WHERE email=?
            `,
        [email]
      );
    } catch (error) {
      throw new Error("No se ha podido obtener los datos de usuario");
    }

    //SI NO HAY USUARIO REGISTRADO CON ESE EMAIL, EMITIMOS ERROR
    if (usuario.length < 1) {
      throw new Error("No existe usuario con ese email");
    }

    const passwordDb = usuario[0].password;

    //COMPROBAR QUE EL USUARIO ESTÁ ACTIVADO
    if (usuario[0].activo !== 1) {
      throw new Error(
        "El usuario no está activado, revisa la bandeja de entrada de tu email para activar tu usuario"
      );
    }

    //COMPARAMOS LA CONTRASEÑA QUE INDICA EL USUARIO CON LA ALMACENADA EN LA BASE DE DATOS
    const esValido = await bcrypt.compare(password, passwordDb);

    if (!esValido) {
      throw new Error("Contraseña incorrecta");
    }

    //CREAMOS UN OBJETO DÓNDE INDICAMOS INFORMACIÓN
    //PARA REGULAR ACCESOS EN LA APLICACIÓN
    const tokenInfo = {
      id: usuario[0].id,
      rol: usuario[0].rol,
    };

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "La clave es correcto",
      token: token,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { loginUsuario };
