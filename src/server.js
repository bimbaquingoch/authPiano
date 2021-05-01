// todos los modulos de nodejs para el funcionamiento
// del proyecto
const express = require("express");
const exhbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");

// modulo APP
// inicializacion del modulo de express
const app = express();

// configuraciones

// accedemos la variable de entorno para el puerto
// busca el puerto 3000 o un puerto que este libre en el server
app.set("port", process.env.PORT || 3000);

// le decimos que encuentre el directorio de views
// donde se encuentran los archivos HBS
// osea para que se puede renderizar el frontend
// para windows linux o mac
app.set("views", path.join(__dirname, "views"));

// plantillas
// renderizamos los archivos de HBS
// arriba definimos que busque el directorio de los
// archivos HBS
// aqui los renderizamos
app.engine(
  ".hbs",
  exhbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

// le decimos que como motor de plantillas estamos usando HBS
app.set("view engine", ".hbs");

// funciones para ejecutar peticiones

// soporte para los datos que vienen del server
// cada que lleguen datos de un form, los convertimos
// en un JSON para manipular en JSON
app.use(express.urlencoded({ extended: false }));

// modulo que guarda mensajes en el servidor
// ****** aun no probado ****
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// esto va con el mensaje del servidor
app.use(flash());

// rutas
// las rutas que definimos en los anteriores archivos
// para que se pueda mover
app.use(require("./routes/index.routes"));

// variables globales
/*
Aun no definimos ninguna variable global
  */

// archivos estaticos (html y css de public)
// le decimos a NODEJS, aqui esta la carpeta public
// donde puede buscar nuestros estilos CSS
app.use(express.static(path.join(__dirname, "public")));

// exportamos todo el modulo app declarado al inicio
// que ejecuta express
// para llamarlo desde el index.js
module.exports = app;
