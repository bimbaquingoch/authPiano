const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render("index");
};

indexCtrl.renderLogin = (req, res) => {
  res.render("login");
};

module.exports = indexCtrl;
