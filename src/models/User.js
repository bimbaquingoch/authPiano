const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
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
  // devuelve true o false
  await bcrypt.compare(password, this.password);
};

module.exports = model("Usuario", userSchema);
