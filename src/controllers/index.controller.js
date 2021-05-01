const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render("index");
};

indexCtrl.renderLogin = (req, res) => {
  res.render("login");
};

indexCtrl.registro = (req, res) => {
  console.log(req.body);
  res.send("registro exitoso");
};

indexCtrl.login = (req, res) => {
  console.log(req.body);
  res.send("login exitoso");
};

indexCtrl.cerrarSesion = (req, res) => {
  res.sed("adios user");
};

module.exports = indexCtrl;
