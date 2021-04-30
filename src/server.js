const express = require("express");
const exhbs = require("express-handlebars");
const path = require("path");

// inicializacion
const app = express();

// configuraciones

// accedemos la variable de entorno para el puerto
// busca el puerto 4000 o un puerto que este libre en el server
app.set("port", process.env.PORT || 3000);

// encuentre el directorio views
// para windows linux o mac
app.set("views", path.join(__dirname, "views"));

// plantillas

app.engine(
  ".hbs",
  exhbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

// funciones para ejecutar peticiones

// soporte para los datos que vienen del server
// cada que lleguen datos de un form, los convertimos
// en un JSON para manipular en JSON
app.use(express.urlencoded({ extended: false }));

// rutas

// llamada a la raiz del proyecto
app.get("/", (req, res) => {
  res.render("index");
});

// variables globales

// archivos estaticos (html y css de public)

// le decimos a NODEJS, aqui esta la carpeta public
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
