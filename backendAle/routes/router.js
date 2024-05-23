//Router.js => Todas as rotas usadas no projeto (caso o projeto tenha mais rotas é possivel utilizar outros arquivos)
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario");
const turmasController = require("../controllers/turmas");
const TypeUser = require("../controllers/tiposUsuarios");

//                    USUARIOS
//USUARIOS : GET => Pega informações da tabela usuarios
router.get("/usuario", usuarioController.getAll);
router.get("/usuario/:id", usuarioController.getById);

//USUARIOS : POST => Cria um usuario passando novas informações ao body
router.post("/usuario", usuarioController.createUsuario);

//USUARIOS : PUT => Atualiza determinadas informações de uma turma
router.put("/usuario/:cpf", usuarioController.updateUsuario);

//USUARIOS : DELETE => Deleta um usuário a partir do id
router.delete("/usuario/:id", usuarioController.deleteUsuario);

//                      TURMAS
//TURMAS : GET => Pega informações da tabela turmas
router.get("/turmas", turmasController.getAll);
router.get("/turmas/:id", turmasController.getById);

//TURMAS : POST => Cria uma turma passando novas informações ao body
router.post("/turmas", turmasController.createTurmas);

//TURMAS : PUT => Atualiza determinadas informações de uma turma
router.put("/turmas/:codigo", turmasController.updateTurmas);

//                      TIPOS USUÁRIOS
//TYPEUSER : GET => Pega informações da tipos usuarios
router.get("/typesuser", TypeUser.getAll);
router.get("/typesuser/:id", TypeUser.getById);

//TYPEUSER : GET => Cria um novo tipo de usuarios
router.post("/typesuser", TypeUser.createTypeUser);

module.exports = router;
