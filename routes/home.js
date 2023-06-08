const express = require('express');
const { leerUrls, agregarUrls, eliminarUrl, editarUrlForm, editarUrl, redireccionamiento } = require('../controllers/homeController');
const urlValidar = require('../middleware/urlValida');
const verficarUser = require('../middleware/verficarUser');
const { formPerfil, editarFotoPerfil } = require('../controllers/perfilController');


const router = express.Router();



router.get("/", verficarUser, leerUrls);

router.post("/", verficarUser, urlValidar, agregarUrls);
router.get("/eliminar/:id", verficarUser, eliminarUrl);
router.get("/editar/:id", verficarUser, editarUrlForm);
router.post("/editar/:id", verficarUser, urlValidar, editarUrl);

router.get("/perfil", verficarUser, formPerfil);
router.post("/perfil", verficarUser, editarFotoPerfil);

router.get("/:shortURL", redireccionamiento);

module.exports = router;