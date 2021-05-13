// llamamos al modulo de mongoose
const mongoose = require("mongoose");

// llamamos a las variables gloables del modulo
// process.env, son variables de entornor que vienen
// ya instaladas en NODEJS
const { PIANO_MONGODB_DATABASE, PIANO_MONGODB_PASSWORD } = process.env;

// le decimos desde donde queremos que se ejecute
//const mongodbURL = `mongodb://${PIANO_MONGODB_HOST}/${PIANO_MONGODB_DATABASE}`;

// const mongodbURL = `mongodb+srv://K3vin:${PIANO_MONGODB_PASSWORD}@cluster0.t5cs5.mongodb.net/${PIANO_MONGODB_DATABASE}?retryWrites=true&w=majority`;
const mongodbURL = `mongodb+srv://K3vin:K1718123563@cluster0.t5cs5.mongodb.net/autenticacion?retryWrites=true&w=majority`;
mongoose
  .connect(mongodbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log(`ERROR: ${err}`));
