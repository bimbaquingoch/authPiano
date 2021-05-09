// controlador de rutas
const indexCtrl = {};

// importar passport para las sesiones
const passport = require("passport");

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

// renderiza el login.hbs
indexCtrl.renderLogin = (req, res) => {
  res.render("login");
};

// obtengo la informacion de
// los formularios de registro y login
const mensajes = [];
const errors = [];
indexCtrl.registro = async (req, res) => {
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
    nota1,
    nota2,
    nota3,
    nota4,
    valor0,
    valor1,
    valor2,
    valor3,
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
  var credencial = {};
  if (nota1 && nota2 && nota3 && nota4) {
    credencial = {
      c1: {
        id: valor0,
        nota:nota1,
      },
      c2: {
        id: valor1,
        nota: nota2,
      },
      c3: {
        id: valor2,
        nota: nota3,
      },
      c4: {
        id: valor3,
        nota: nota4,
      },
    };
  } else {
    errors.push({ text: "Una o varias notas no han sido seleccionadas" });
  }

  if (errors.length > 0) {
    res.render("index", {
      errors,
      nombre,
      apellido,
      nickname,
      email,
      phone,
      age,
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
      credencial,
    });
    // encriptamos la contraseña del usuario
    usuarioNuevo.password = await usuarioNuevo.encryptPWD(password);
    usuarioNuevo.verifypass = usuarioNuevo.password;

    for (const property in credencial) {
      usuarioNuevo.credencial[property].nota= await usuarioNuevo.encryptPWD(credencial[property].nota)
    }


    
    await usuarioNuevo.save();
    console.log(req.body);
    mensajes.push({ text: "Usuario registrado exitosamente" });
    res.render("login", { mensajes });
  }
};

// valida una autenticacion
indexCtrl.login = passport.authenticate("local", {
  // si existe un error que se redirija a esta ruta
  failureRedirect: "/login",
  successRedirect: "/authPage",
  failureFlash: true,
});

// renderiza la pagina de autenticacion

indexCtrl.authPage = (req, res) => {
  res.render("authPage");
};

// pagina de bienvanida

indexCtrl.welcome = (req, res) => {
  res.render("welcome");
};

// aun no esta programada para cerra sesion
// esto esta pendiente
indexCtrl.cerrarSesion = (req, res) => {
  req.logout();
  mensajes.push({ text: "Has cerrrado Sesion" });
  res.render("login", { mensajes });
};

// exportamos todo el objeto indexCtrl
module.exports = indexCtrl;
