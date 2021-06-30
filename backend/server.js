//REQUERIMOS MODULOS Y DATOS PARA ARRANCAR EL SERVIDOR
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

//OBTENEMOS CONTROLADORES PARA LOS DISTINTOS MÉTODOS Y FUNCIONALIDADES

// Controladores de usuario

const { crearUsuario } = require('./controladores/usuarios/crearUsuario');
const { listarUsuario } = require('./controladores/usuarios/listarUsuario');
const { activarUsuario } = require('./controladores/usuarios/activarUsuario');
const { loginUsuario } = require('./controladores/usuarios/loginUsuario');
const { editarUsuario } = require('./controladores/usuarios/editarUsuario');
const { borrarUsuario } = require('./controladores/usuarios/borrarUsuario');
const { editarClave } = require('./controladores/usuarios/editarClave');

// Controladores de noticia
const { crearNoticia } = require('./controladores/noticias/crearNoticia');
const { borrarNoticia } = require('./controladores/noticias/borrarNoticia');
const { editarNoticia } = require('./controladores/noticias/editarNoticia');
const { getNoticia } = require('./controladores/noticias/getNoticia');
const { getNoticias } = require('./controladores/noticias/getNoticias');

// Controladores de votos
const { getLikes } = require('./controladores/votos/getLikes');
const { getDislikes } = require('./controladores/votos/getDislikes');
const { votar } = require('./controladores/votos/votar');

/*
const { recuperar } = require("./controladores/usuarios/recuperar");
*/

//APLICAMOS MIDDLEWARES GENERALES DE USO
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static('static'));

//OBTENEMOS MIDDLEWARES PARA LA PREVIA DE LOS
// DISTINTOS MÉTODOS Y FUNCIONALIDADES
const { validAuth } = require('./middlewares/validAuth');
const { isSameUser } = require('./middlewares/isSameUser');
const { isAdmin } = require('./middlewares/isAdmin');
const { canEdit } = require('./middlewares/canEdit');
const { didUserVote } = require('./middlewares/didUserVote');

//APLICAMOS MIDDLEWARES ENDPOINTS

//CREAR USUARIO ✅
app.post('/usuario', crearUsuario);

//ACTIVACIÓN DE USUARIO ✅
app.get('/activar/:codigoRegistro', activarUsuario);

//LISTAR USUARIO ✅
app.get('/usuario/:id', validAuth, listarUsuario);

//LOGIN USUARION ✅
app.post('/login', loginUsuario);

//EDITAR PERFIL USUARIO ✅
app.put('/usuario/:id', validAuth, isSameUser, editarUsuario);

//BORRAR PERFIL USUARIO ✅
app.delete('/usuario/:id', validAuth, isSameUser, borrarUsuario);

//EDITAR PASSWORD
app.put('/usuario/password/:id', validAuth, isSameUser, editarClave);

// LISTAR NOTICIAS
app.get('/noticias', getNoticias);

//CREAR NOTICIA
app.post('/noticia', validAuth, crearNoticia);

//BORRAR NOTICIA
app.delete('/noticia/:id', validAuth, canEdit, borrarNoticia);

//EDITAR NOTICIA
app.put('/noticia/:id', validAuth, canEdit, editarNoticia);

// LISTAR NOTICIA
app.get('/noticia/:id', getNoticia);

// VOTAR NOTICIA
app.post('/noticia/:idNoticia/vote', validAuth, didUserVote, votar);

// COUNT LIKES
app.get('/noticia/:idNoticia/likes', getLikes);

// COUNT DISLIKES
app.get('/noticia/:idNoticia/dislikes', getDislikes);

/*
//BORRAR PERFIL USUARIO
app.delete("/user/:id", validAuth, isAdmin, deleteUser);
/*
//RECORDAR CONTRASEÑA
app.put("/recoverPassword", recover);

//RESETEAR CONTRASEÑA
app.put("/reset/:code", resetPassword);

//CREAR ENTRADA EN EL DIARIO
app.post("/diary", validAuth, newEntry);

//EDITAR LA ENTRADA DEL DIARIO
app.put("/diary/:id", validAuth, canEdit, editEntry);

//VER UNA DETERMINADA ENTRADA DEL DIARIO
app.get("/diary/:id", getEntry);

//BORRAR UNA ENTRADA DEL DIARIO
app.delete("/diary/:id", validAuth, canEdit, deleteEntry);

//LISTAR ENTRADAS DEL DIARIO
app.get("/diary", listEntries);

// ADJUNTAR FOTOS A UNA ENTRADA
app.post("/diary/:id/photos", validAuth, canEdit, addEntryPhoto);

// BORRAR FOTOS DE UNA ENTRADA
app.delete("/diary/:id/photos/:photoID", validAuth, canEdit, deleteEntryPhoto);

// VOTAR UNA ENTRADA DEL DIARIO
app.post("/diary/:id/votes", validAuth, voteEntry);

*/

//MIDDLEWARE DE GESTION DE ERRORES

app.use(function (error, req, res, next) {
  if (error) {
    res.status(error.httpStatus || 500).send({ error: error.message });
  }
});

//MIDDLEWARE DE GESTIÓN DE RUTA NO ENCONTRADA
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
