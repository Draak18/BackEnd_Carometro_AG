const Usuario = require("../models/usuario");
const UsuariosTurmas = require('../models/usuario_turmas');
const { where } = require('sequelize');

exports.getAll = async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

exports.getById = async (req, res) => {
  //no router id é o que vem depois do usuario/
  const idDoParam = req.params.id;
  const usuarioEncontrado = await Usuario.findOne({ idUsuarios: idDoParam });
  res.json(usuarioEncontrado);
};

exports.createUsuario = async (req, res) => {
  const usuarioCadastrado = await Usuario.findOne({ where: { cpf: req.body.cpf } });
  //verificacao duplicidade de usuario cadasrtado
  if (usuarioCadastrado) {
    return res.send("Já existe um usuario cadastrado neste CPF.");
  } 
  const usuarioCriado = await Usuario.create(req.body);
  if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas) {
    await UsuariosTurmas.create({ 
      Turmas_idTurmas: req.body.Turmas_idTurmas, 
      Usuarios_idUsuarios: usuarioCriado.idUsuarios, })
  }
  else{
    console.log("usuario cadastrado, porém sem turma");
  }
  return res.send("Usuário cadastrada com sucesso");
  //res.json(usuarios)
};


exports.updateUsuarios = async (req, res) => {
  const cpfAlunos = req.params.cpf;
  try {
    const alunoCadastrado = await Usuario.findOne({ where: { cpf: cpfAlunos } });
    if (alunoCadastrado) {
      delete req.body.cpf;//está aqui para não atrapalhar o fluxo do código, deletando o nome da turma antes de ser feita qualquer alteração
      // delete req.body.Tipos_Usuarios_idTipos_Usuarios;

      const [numRowsUpdated] = await Usuario.update(req.body, {
        where: { cpf: cpfAlunos }
      });
      if (numRowsUpdated > 0) {
        const alunoAtualizado = await Usuario.findOne({ where: { cpf: cpfAlunos } });
        return res.send({ message: 'Aluno Atualizado com sucesso', alunocomdadosnovos: alunoAtualizado });
      }
      else {
        return res.send('Aluno encontrado, porem sem novos dados para atualizar')
      }
    }
    else {
      return res.status(404).send('Não existe nenhuma aluno cadastrado com este cpf');
    }

  }
  catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    return res.status(500).send("Ocorreu um erro ao atualizar o aluno");
  }
}

exports.deleteUsuario = async (req, res) => {
  try{
    const {id} = req.params;
    const usuario = await Usuario.findByPk(id);
    if(!usuario){
      return res.status(404).send("Usuário não encontrado");
    }
    const desvincular = await UsuariosTurmas.findOne({where:{Usuarios_idUsuarios: usuario.idUsuarios}})
    if (desvincular) {
      await desvincular.destroy();
    }
    await usuario.destroy();

    return res.send("Usuário deletado com sucesso");
  } catch(error) { 
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).send("Erro ao deletar usuário");
  }
};