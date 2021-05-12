// // llamamos al modulo de mongoose
// const mongoose = require("mongoose");

// // llamamos a las variables gloables del modulo
// // process.env, son variables de entornor que vienen
// // ya instaladas en NODEJS
// const { PIANO_MONGODB_HOST, PIANO_MONGODB_DATABASE } = process.env;

// // le decimos desde donde queremos que se ejecute
// // const mongodbURL = `mongodb://${PIANO_MONGODB_HOST}/${PIANO_MONGODB_DATABASE}`;

// // mongoose
// //   .connect(mongodbURL, {
// //     useUnifiedTopology: true,
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// //   })
// //   .then((db) => console.log("Base de datos conectada"))
// //   .catch((err) => console.log(`ERROR: ${err}`));

// let urlDB = "";
// if (process.env.PORT) {
//   // urlDB = "mongodb://localhost:27017/proyecto";
//   const mongodbURL = `mongodb://${PIANO_MONGODB_HOST}/${PIANO_MONGODB_DATABASE}`;
//   mongoose
//     .connect(mongodbURL, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     })
//     .then((db) => console.log("Base de datos conectada"))
//     .catch((err) => console.log(`ERROR: ${err}`));
// } else {
//   // urlDB = "hola";
//   // "mongodb+srv://user_db:1a2b3c4d5s@proyectointegrador.ctgyz.mongodb.net/proyectoIntegrador?retryWrites=true&w=majority";
//   urlDB =
//     "mongodb+srv://K3vin:K1718123563@cluster0.t5cs5.mongodb.net/autenticacion?retryWrites=true&w=majority";
// }
// process.env.URLDB = urlDB;
process.env.PORT = process.env.PORT || 3000;
//en el entorno de desarrollo
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//conexion a la base de datos

let urlDB = "";
if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/proyecto";
} else {
  //urlDB =
  //  "mongodb+srv://user_db:1a2b3c4d5s@proyectointegrador.ctgyz.mongodb.net/proyectoIntegrador?retryWrites=true&w=majority";
  ////urlDB = "mongodb+srv://kevin:k171812@cluster0.hmqlq.mongodb.net/Centro_Medico?retryWrites=true&w=majority";
  urlDB =
    "mongodb+srv://K3vin:K1718123563@cluster0.t5cs5.mongodb.net/autenticacion?retryWrites=true&w=majority";
  // }
}
process.env.URLDB = urlDB;
