const Turmas = require("../models/turmas");

exports.getAll = async (req, res) => {
  const turmas = await Turmas.findAll();
  res.json(turmas);
};

exports.getById = async (req, res) => {
  const idDoParam = req.params.id;
  const turmaEncontrada = await Turmas.findOne({ idTurmas: idDoParam });
  res.json(turmaEncontrada);
};

exports.createTurmas = async (req, res) => {
  const turmaCadastrada = await Turmas.findOne({
    where: { codigo: req.body.codigo },
  });

  if (turmaCadastrada) {
    return res.send("Já existe uma turma cadastrada com esse código");
  }
  const turmaCriada = await Turmas.create(req.body);
  console.log("Uma nova turma foi criada!", turmaCriada);
  return res.json("Turma criada com sucesso!");
};

exports.updateTurmas = async (req, res) => {
  const codigoTurma = req.params.codigo;

  try {
    const turmaCadastrada = await Turmas.findAll({
      where: { codigo: codigoTurma },
    });

    if (turmaCadastrada) {
      // Delete serve como medida de segurança
      delete req.body.codigo;
      const [numRowsUpdated] = await Turmas.update(req.body, {
        where: { codigo: codigoTurma },
      });

      if (numRowsUpdated > 0) {
        const turmaAtualizada = await Turmas.findOne({
          where: { codigo: codigoTurma },
        });
        return res.send({
          message: "Turma atualizada com sucesso!",
          turmacomdadosnovos: turmaAtualizada,
        });
      } else {
        return res.send("Não foi possível atualizar a turma!");
      }
    } else {
      return res.send("Turma não encontrada!");
    }
  } catch (error) {
    console.error("Erro ao atualizar turma: ", error);
    return res.status(500).send("Ocorreu um erro ao atualizar a turma!")
  }
};
