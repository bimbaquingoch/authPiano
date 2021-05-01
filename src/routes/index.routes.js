const { Router } = require("express");

const router = Router();

const { renderIndex, renderLogin } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/login", renderLogin);

module.exports = router;
