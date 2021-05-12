// el enrutamiento de las diferentes direcciones

// llamamos al metodo router de paquete de express
const { Router } = require("express");

// ejecutamos el router
const router = Router();

// esto es lo que definimos en el archivo index.controller
// para mostrar los formularios y validar la informacion

const {
  renderIndex,
  renderLogin,
  renderAuthPage,
  login,
  registro,
  authPage,
  welcome,
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.post("/", registro);
router.get("/login", renderLogin);
router.post("/login", login);
router.get("/authPage", renderAuthPage);
router.post("/authPage", authPage);
router.get("/welcome", welcome);

// exportamos el router
// para usarlo en el server.js
module.exports = router;
