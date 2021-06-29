const { conexionDB } = require("./db");
const bcrypt = require("bcrypt");

async function main() {
  let connection;
  try {
    connection = await conexionDB();
    await connection.query(`DROP TABLE IF EXISTS noticiometro`);
    await connection.query(`DROP TABLE IF EXISTS usuarios`);
    await connection.query(`DROP TABLE IF EXISTS votos`);
    await connection.query(`DROP TABLE IF EXISTS imagenes`);

    await connection.query(`
            CREATE TABLE usuarios(
            id INT PRIMARY KEY AUTO_INCREMENT,
            fechaRegistro DATETIME NOT NULL,
            email VARCHAR(100) UNIQUE  NOT NULL,
            password TINYTEXT NOT NULL,
            rol ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
            nombre TINYTEXT,
            imagen TINYTEXT,
            activo BOOLEAN DEFAULT false,
            codigoRegistro TINYTEXT,
            passwordUpdateCode TINYTEXT,
            ultimoCambio DATETIME NOT NULL,
            lastAuthUpdate DATETIME NOT NULL
            )
        `);

    console.log("tablas creadas usuarios");

    await connection.query(`
        CREATE TABLE noticiometro(
            id INT PRIMARY KEY AUTO_INCREMENT,
            fecha DATETIME NOT NULL,
            descripcion TEXT,
            lugar VARCHAR(50) NOT NULL,
            ultimoCambio DATETIME NOT NULL,
            id_usuario INT,
            FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        )
        `);

    console.log("tablas creadas noticiometro");

    await connection.query(`
        CREATE TABLE imagenes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            fechaSubida DATETIME NOT NULL,
            imagen TINYTEXT,
            id_noticiometro INT,
            FOREIGN KEY (id_noticiometro) REFERENCES noticiometro (id)
        )`);

    console.log("tablas creadas imagenes");

    await connection.query(`
            CREATE TABLE votos(
                id INT PRIMARY KEY AUTO_INCREMENT,
                voto TINYINT NOT NULL,
                fecha DATETIME NOT NULL,
                id_usuario INT,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
                id_noticiometro INT,
                FOREIGN KEY (id_noticiometro) REFERENCES noticiometro (id)
                )    
        `);

    console.log("tablas creadas");

    const password = await bcrypt.hash("123456789", 10);

    await connection.query(`
        INSERT INTO usuarios(
            fechaRegistro,
            email,
            password, 
            rol,
            activo,
            ultimoCambio,
            lastAuthUpdate 
        )
        VALUES(
            UTC_TIMESTAMP,
            "pablo@gmail.com",
            "${password}",
            "admin",
            true,
            UTC_TIMESTAMP,
            UTC_TIMESTAMP
        )
        `);

    // const usuarios = 50;
    // for (let i = 0; i < usuarios; i++) {
    //   const email = faker.internet.email();
    //   const name = faker.name.findName();
    //   await connection.query(`
    //         INSERT INTO usuarios(
    //             registrationDate,
    //             email,
    //             password,
    //             name,
    //             lastUpdate,
    //             lastAuthUpdate
    //             )
    //         VALUES(
    //             UTC_TIMESTAMP,
    //             "${email}",
    //             123456789,
    //             "${name}",
    //             UTC_TIMESTAMP,
    //             UTC_TIMESTAMP
    //             )`);
    // }

    // console.log("usuarios creados");

    // for (let i = 1; i <= 50; i++) {
    //   const description = faker.commerce.productDescription();
    //   const place = faker.address.city();
    //   await connection.query(`
    //         INSERT INTO noticiometro(
    //             date,
    //             description,
    //             place,
    //             lastUpdate ,
    //             id_usuario
    //             )
    //         VALUES(
    //             UTC_TIMESTAMP,
    //             "${description}",
    //             "${place}",
    //             UTC_TIMESTAMP,
    //             ${i}
    //         )
    //         `);
    // }
    // console.log("entradas diario creadas");

    // const entries = 200;
    // for (let i = 1; i <= entries; i++) {
    //   const vote = random(1, 5);
    //   const idEntrada = random(1, usuarios);
    //   const idUsuario = random(2, usuarios);
    //   await connection.query(`
    //             INSERT INTO noticiometro_votes(
    //                 vote ,
    //                 date,
    //                 lastUpdate ,
    //                 id_usuario ,
    //                 id_noticiometro
    //                 )
    //             VALUES(
    //                 "${vote}",
    //                 UTC_TIMESTAMP,
    //                 UTC_TIMESTAMP,
    //                 "${idUsuario}",
    //                 "${idEntrada}"
    //                 )
    //         `);
    // }
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("Todo leído, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
