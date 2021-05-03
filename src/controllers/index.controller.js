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
    ciudad,
    img,
    cedula,
    genero,
  } = req.body;

  if (password != verifypass) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }

  if (password.length < 5) {
    errors.push({
      text: "La contraseña es muy corta! prueba con más de 8 caracteres",
    });
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
      ciudad,
      img,
      cedula,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    //si se encontro un correo
    if (emailUser) {
      req.flash("error_msg", "Ya existe un usuario con este correo");
      res.redirect("login");
    } else {
      const newUser = new User({
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
      await newUser.save();
      res.redirect("login");
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
