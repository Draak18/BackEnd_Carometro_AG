// routes/router.js
//nesse arquivo estarão todas as rotas
//no caso de um proj com muitas rotas é possível quebrar as rotas em mais arquivos
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario");
const turmasController= require("../controllers/turmas");


// usuario GET


//retorna todos usuarios
router.get("/usuario", usuarioController.getAll);
router.get("/usuario/:id", usuarioController.getById);

// usuario POST
//cria um usuario passando informação no body
router.post("/usuario", usuarioController.createUsuario);



//turmas  GET
router.get('/turmas', turmasController.getAll)
router.get('/turmas/:id', turmasController.getById)


//usuario POST
router.post("/turmas", turmasController.createTurmas);

//usuario PUT
router.put("/turmas/:codigo", turmasController.updateTurmas)
router.put("/usuario/:cpf", usuarioController.updateUsuarios)
/* router.get('/turmas', turmas Controller.getAll)
router.get('/turmas/:id', turmasController.getById) */
/* router.get('/usuario', usuarioController.listarUsuarios) */

module.exports = router;
