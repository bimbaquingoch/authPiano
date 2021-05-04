// controlador de rutas
const indexCtrl = {};

// llamamos a la clase usuario para guardar
// los datos que nos llega del formulario

const User = require("../models/User");

// indexCtrl.(este es el nombre del metodo)
// indexCtrl.renderizarLogin
// estos vienen a formar parte del objeto
// indexCtrl

// renderiza la pagina principal, el index.hbs
indexCtrl.renderIndex = (req, res) => {
  res.render("index");
};

// renderiza la pagina principal, el login.hbs
indexCtrl.renderLogin = (req, res) => {
  res.render("login");
};

// obtengo la informacion de
// los formularios de registro y login
indexCtrl.registro = async (req, res) => {
  const mensajes = [];
  const errors = [];
  const {
    nombre,
    apellido,
    nickname,
    email,
    password,
    verifypass,
    estCivil,
    phone,
    age,
    provincia,
    canton,
    img,
    cedula,
    genero,
  } = req.body;

  if (password != verifypass) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }

  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    errors.push({ text: "Su email ya se encuentra registrado" });
  }

  const cedulaUser = await User.findOne({ cedula: cedula });
  if (cedulaUser) {
    errors.push({ text: "Su cedula ya se encuentra registrado" });
  }

  const nicknameUser = await User.findOne({ nickname: nickname });
  if (nicknameUser) {
    errors.push({ text: "Su nickname ya se encuentra registrado" });
  }

  if (errors.length > 0) {
    res.render("index", {
      errors,
      nombre,
      apellido,
      nickname,
      email,
      estCivil,
      phone,
      age,
      provincia,
      canton,
      cedula,
      genero,
    });
  } else {
    const usuarioNuevo = new User({
      nombre,
      apellido,
      nickname,
      email,
      password,
      verifypass,
      estCivil,
      phone,
      age,
      provincia,
      canton,
      img,
      cedula,
      genero,
    });
    // encriptamos la contraseña del usuario
    usuarioNuevo.password = await usuarioNuevo.encryptPWD(password);
    usuarioNuevo.verifypass = usuarioNuevo.password;
    // await usuarioNuevo.save();
    console.log(usuarioNuevo);
    console.log(req.body);
    mensajes.push({ text: "Usuario registrado exitosamente" });
    res.render("login", { mensajes });
  }
};

indexCtrl.login = (req, res) => {
  console.log(req.body);
  res.send("login exitoso");
};

// aun no esta programada para cerra sesion
// esto esta pendiente
indexCtrl.cerrarSesion = (req, res) => {
  res.sed("adios user");
};

// exportamos todo el objeto indexCtrl
module.exports = indexCtrl;
