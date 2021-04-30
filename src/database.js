const mongoose = require("mongoose");

const { PIANO_MONGODB_HOST, PIANO_MONGODB_DATABASE } = process.env;

const mongodbURL = `mongodb://${PIANO_MONGODB_HOST}/${PIANO_MONGODB_DATABASE}`;

mongoose
  .connect(mongodbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log(`ERROR: ${err}`));

//let urlDB = "";
//if (process.env.NODE_ENV === "dev") {
//  urlDB = "mongodb://localhost:27017/proyecto";
//} else {
//  urlDB = "hola";
//  // "mongodb+srv://user_db:1a2b3c4d5s@proyectointegrador.ctgyz.mongodb.net/proyectoIntegrador?retryWrites=true&w=majority";
//  //urlDB = "mongodb+srv://kevin:k171812@cluster0.hmqlq.mongodb.net/Centro_Medico?retryWrites=true&w=majority";
//}
//process.env.URLDB = urlDB;
