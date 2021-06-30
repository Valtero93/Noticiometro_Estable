const path = require("path");
const fs = require("fs").promises;
const sharp = require("sharp");
const uuid = require("uuid");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.APIKEY);

// path de subida de imágenes
const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIR);

async function enviarMail({ to, subject, message }) {
  try {
    const msg = {
      to: to,
      from: process.env.SEND_FROM,
      subject: subject,
      text: message,
    };

    await sendgrid.send(msg);
  } catch (error) {
    console.error(error);

    throw new Error("Error enviando mail");
  }
}

async function subirImagen({ file, directory }) {
  // subdirectorio concreto de subida de esta imagenn (con respecto al path anterior)
  const targetDir = path.join(uploadsDir, directory);

  // nos aseguramos que el directorio existe
  await fs.mkdir(targetDir, { recursive: true });

  // Cargamos la imagenn en sharp
  const imagen = sharp(file.data);

  // Sacamos información de la imagenn
  const infoImagen = await imagen.metadata();

  // Cambiamos el tamaño de la imagenn si es más grande que 800px de ancho
  if (infoImagen.width > 800) {
    imagen.resize(800);
  }

  // generamos un nombre aleatorio para la imagenn
  const filename = `${uuid.v4()}.jpg`;

  // guardamos la imagenn en el directorio correcto
  await imagen.toFile(path.join(targetDir, filename));

  return filename;
}

async function borrarImagen({ file, directory }) {
  const imagenPath = path.join(uploadsDir, directory, file);

  await fs.unlink(imagenPath);
}

module.exports = {
  enviarMail,
  subirImagen,
  borrarImagen,
};
