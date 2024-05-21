//Router.js => Todas as rotas usadas no projeto (caso o projeto tenha mais rotas é possivel utilizar outros arquivos)
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario");
const turmasController = require("../controllers/turmas");

//                    USUARIOS
//USUARIOS : GET => Pega informações da tabela usuarios
router.get("/usuario", usuarioController.getAll);
router.get("/usuario/:id", usuarioController.getById);


//USUARIOS : POST => Cria um usuario passando novas informações ao body
router.post("/usuario", usuarioController.createUsuario);

//USUARIOS : PUT => Atualiza determinadas informações de uma turma
router.put("/usuario/:cpf", usuarioController.updateUsuario);


//                      TURMAS
//TURMAS : GET => Pega informações da tabela turmas
router.get("/turmas", turmasController.getAll);
router.get("/turmas/:id", turmasController.getById);


//TURMAS : POST => Cria uma turma passando novas informações ao body
router.post("/turmas", turmasController.createTurmas);

//TURMAS : PUT => Atualiza determinadas informações de uma turma
router.put("/turmas/:codigo", turmasController.updateTurmas);


module.exports = router;
