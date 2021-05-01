const { Router } = require("express");

const router = Router();

const {
  renderIndex,
  renderLogin,
  login,
  registro,
  cerrarSesion,
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.post("/", registro);
router.get("/login", renderLogin);
router.post("/login", login);

module.exports = router;
