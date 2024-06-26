const Usuario = require("../models/usuario");
const UsuariosTurmas = require('../models/usuario_turmas');

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
  const usuarioCadastrado = await Usuario.findOne({ where: {cpf : req.body.cpf}});
    if (usuarioCadastrado) {
        return res.send('Já existe um usuário cadastrado neste CPF.')
    }
    const usuarioCriado = await Usuario.create(req.body);
    if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas){
        await UsuariosTurmas.create({
            Turmas_idTurmas: req.body.Turmas_idTurmas,
            Usuarios_idUsuarios: usuarioCriado.idUsuarios,
        })
    }
    console.log("usuarioCriado", usuarioCriado);
    return res.send("Usuário criado com sucesso");
};

exports.updateUsuario = async (req, res) => {
  const codigoUsuario = req.params.cpf;

  try {
    const usuarioCadastrado = await Usuario.findAll({
      where: { cpf: codigoUsuario },
    });

    if (usuarioCadastrado) {
      delete req.body.cpf;
      delete req.body.Tipos_Usuarios_idTipos_Usuarios;
      const [numRowsUpdated] = await Usuario.update(req.body, {
        where: { cpf: codigoUsuario },
      });

      if (numRowsUpdated > 0) {
        const usuarioAtualizado = await Usuario.findOne({
          where: { cpf: codigoUsuario },
        });
        return res.send({
          message: "Usuário atualizado com sucesso!",
          usuariocomdadosnovos: usuarioAtualizado,
        });
      } else {
        return res.send("Não foi possível atualizar o usuário!");
      }
    } else {
      return res.send("Usuário não encontrado!");
    }
  } catch (error) {
    console.error("Erro ao atualizar usuario: ", error);
    return res.status(500).send("Não foi possível atualizar o usuário!");
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).send("Usuário não encontrado");
    }
    const desvincular = await UsuariosTurmas.findOne({
      where: { Usuarios_idUsuarios: usuario.idUsuarios },
    });
    if (desvincular) {
      await desvincular.destroy();
    }
    await usuario.destroy();

    return res.send("Usuário deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).send("Erro ao deletar usuário");
  }
};
