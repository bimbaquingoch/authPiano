// controlador de rutas
const indexCtrl = {};

// importar passport para las sesiones
const passport = require("passport");

// llamamos a la clase usuario para guardar
// los datos que nos llega del formulario

const User = require("../modelos/User");

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
    nivelEducacion,
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

  errors.splice(0, errors.length);
  if (cedula.length != 10) {
    errors.push({ text: "Su cedula debe tener 10 números" });
  }

  if (phone.length != 10) {
    errors.push({ text: "SU número de telefono debe tener 10 números" });
  }

  if (nombre.length < 3) {
    errors.push({ text: "El nombre es demaciado corto. Mínimo 3 caracteres" });
  }

  if (apellido.length < 3) {
    errors.push({
      text: "Su apellido es demaciado corto. Mínimo 3 caracteres",
    });
  }

  if (password != verifypass) {
    errors.push({ text: "Las contraseñas no coinciden." });
  }

  if (password.length < 8) {
    errors.push({ text: "La contraseña es muy corta, mínimo 8 caracteres." });
  }

  if (nickname.length < 5) {
    errors.push({ text: "Apodo muy corto, minimo 5 caracteres" });
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
  if (nota1 == "" || nota2 == "" || nota3 == "" || nota4 == "") {
    errors.push({ text: "Una o varias notas no tiene asignado un valor" });
  } else {
    credencial = {
      id: [valor0, valor1, valor2, valor3],
      nota: [nota1, nota2, nota3, nota4],
    };
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
      nivelEducacion,
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

    // encriptamos los token musicales del usuario
    /*
     for (var i = 0; i < credencial.nota.length; i++) {
       usuarioNuevo.credencial.nota[i] = await usuarioNuevo.encryptPWD(credencial.nota[i])
     }
 */

    await usuarioNuevo.save();
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
indexCtrl.renderAuthPage = (req, res) => {
  if (req.user) {
    const user = req.user;
    var ids = new Array(4);
    //Obtenemos los ids de las notas musicales
    ids = user.credencial.id;
    //Barajear o mezaclar los id de las notas
    for (var i = ids.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = ids[i];
      ids[i] = ids[j];
      ids[j] = temp;
    }
    res.render("authPage", { notasIds: ids, nickname: user.nickname });
  } else {
    res.render("index");
  }
};

indexCtrl.authPage = async (req, res) => {
  const {
    nota1,
    nota2,
    nota3,
    nota4,
    valor0,
    valor1,
    valor2,
    valor3,
    nickname,
  } = req.body;
  const errors = [];
  var credencial = {};
  if (
    nota1.length != 0 &&
    nota2.length != 0 &&
    nota3.length != 0 &&
    nota4.length != 0
  ) {
    credencial = {
      id: [valor0, valor1, valor2, valor3],
      nota: [nota1, nota2, nota3, nota4],
    };

    const credencialUser = await User.findOne(
      { nickname: nickname },
      { credencial: 1, _id: 0 }
    );
    idNotasUser = credencialUser["credencial"]["id"];
    NotasUser = credencialUser["credencial"]["nota"];
    var i = 0;
    var pos = 0;
    bandera = true;
    while (bandera) {
      var pos = idNotasUser.indexOf(credencial.id[i]);
      NotasUser[pos] == credencial.nota[i];
      if ((NotasUser[pos] === credencial.nota[i]) == false) {
        errors.push({ text: "Credenciales musicales Invalidas" });
        bandera = false;
      }
      if (i > 4) {
        bandera = false;
      }
      pos++;
      i++;
    }
  } else {
    errors.push({ text: "Una o varias notas no han sido seleccionadas" });
  }

  if (errors.length > 0) {
    res.render("login", { errors });
  } else {
    res.render("welcome", { nickname: nickname });
  }
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
