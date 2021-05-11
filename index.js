require("dotenv").config();

// llamamos al modulo app, del archivo server.js
const app = require("./src/server");
require("./src/database");

// llamamos al puerto de acceso desde el archivo database
const port = app.get("port");

// nos muestra en consola un mensaje por consola
// diciendo que el servidor esta corriendo
app.listen(port, () => {
  console.log(`server iniciado en: ${port}`);
});
