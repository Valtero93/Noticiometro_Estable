sudosh#!/bin/bash

# CREAR LA BASE DE DATOS -

sh crear_base.sh

# CREAR USUARIO PARA LA BASE DE DATOS

sh crear_usuario.sh

# CREAR .env

touch .env

# CREAR CONTROLADORES DE USUARIO

mkdir -p controladores/usuarios
touch controladores/usuarios/activarUsuario.js
touch controladores/usuarios/crearUsuario.js
touch controladores/usuarios/editarUsuario.js
touch controladores/usuarios/borrarUsuario.js
touch controladores/usuarios/editarContraseña.js
touch controladores/usuarios/loginUsuario.js
touch controladores/usuarios/resetContraseña.js
touch controladores/usuarios/listarUsuario.js

