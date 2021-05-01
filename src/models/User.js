// generamos la clase que es el usuario con
// todos sus campos

// esto llama funcionalidades de mongoose
// mongoose es un paquete de nodejs para la parte de mongoDB
const { Schema, model } = require("mongoose");

// paquete de nodejs para encriptar informacion
// en este caso lo vamos a usar para encriptar la contraseña
const bcrypt = require("bcryptjs");

// la "clase" usuario
// definimos todo lo que va a contener esta clase
// todo es formato JSON
// esta definido para que los campos sean requeridos
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    apellido: {
      type: String,
      required: [true, "El apelledio es obligatorio"],
    },
    nickname: {
      type: String,
      required: [true, "nickname es obligatorio"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    verifypass: {
      type: String,
      require: true,
    },
    estCivil: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
      unique: true,
    },
    age: {
      type: Date,
      require: true,
    },
    provincia: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    cedula: {
      type: Number,
      required: [true, "Su cedula es obligatoria"],
    },
    genero: {
      type: String,
      required: [true, "Seleccione un campo"],
    },
  },
  {
    timestamps: true,
  }
);

// metodo para encriptar la contraseña
userSchema.methods.encryptPWD = async (password) => {
  const salt = await bcrypt.genSalt(10);
  // contraseña encriptada.
  return await bcrypt.hash(password, salt);
};

// comparara la contraseña que se ingresa
userSchema.methods.comparaPWD = async function (password) {
  // si considen
  // devuelve true o false
  await bcrypt.compare(password, this.password);
};

// asi se exportan los modulos de javascript para
// poder acceder a ellos desde otros archivos
// exportamos el modelo como "Usuario" con el contenido
// que definimos dentro de userSchema
module.exports = model("Usuario", userSchema);
