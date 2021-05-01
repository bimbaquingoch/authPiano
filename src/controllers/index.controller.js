// controlador de rutas
const indexCtrl = {};

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

// obtengo la informacion del
// los formularios de registro y login
indexCtrl.registro = (req, res) => {
  console.log(req.body);
  res.send("registro exitoso");
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
