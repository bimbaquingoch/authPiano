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
    ciudad,
    img,
    cedula,
    genero,
  } = req.body;

  if (password != verifypass) {
    mensajes.push({ text: "Las contraseñas no coinciden" });
  }

  if (password.length < 5) {
    mensajes.push({
      text: "La contraseña es muy corta! prueba con más de 8 caracteres",
    });
  }

  if (mensajes.length > 0) {
    res.render("index", {
      mensajes,
      nombre,
      apellido,
      nickname,
      email,
      estCivil,
      phone,
      age,
      provincia,
      ciudad,
      cedula,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    const nickUser = await User.findOne({ nickname: nickname });
    //si se encontro un correo
    if (emailUser) {
      mensajes.push({ text: "Ya existe un usuario con este correo" });
      res.render("login", { mensajes });
    } else if (nickUser) {
      mensajes.push({ text: "Ya existe un usuario con este nickname" });
      res.render("index", {
        mensajes,
        nombre,
        apellido,
        email,
        estCivil,
        phone,
        age,
        provincia,
        ciudad,
        cedula,
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
        ciudad,
        img,
        cedula,
        genero,
      });
      // encriptamos la contraseña del usuario
      usuarioNuevo.password = await usuarioNuevo.encryptPWD(password);
      usuarioNuevo.verifypass = usuarioNuevo.password;
      await usuarioNuevo.save();
      console.log(usuarioNuevo);
      mensajes.push({ text: "Usuario registrado exitosamente" });
      res.render("login", { mensajes });
    }
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
