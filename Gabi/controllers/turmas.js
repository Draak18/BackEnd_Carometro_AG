const { where } = require("sequelize");
const Turmas = require("../models/turmas");


exports.getAll = async (req, res) => {
  const turmas = await Turmas.findAll();
  res.json(turmas);
};

exports.getById = async (req, res) => {
  //no router id é o que vem depois do usuario/
  const idDoParam = req.params.id;
  const TurmasEncontrado = await Turmas.findOne({ idTurmas: idDoParam });
  res.json(TurmasEncontrado);
};

exports.createTurmas = async (req, res) => {
  const turmasCadastrada = await Turmas.findOne({
    where: {codigo:req.body.codigo},
  });
  if(turmasCadastrada){
    return res.send("Essa turma já existe");
  }
  const turmasCriado = await Turmas.create(req.body);
  console.log("usuario Criado", turmasCriado);
  return res.send("Usuário cadastrado com sucesso");
};

exports.updateTurmas = async (req, res) => {
  const codigoTurmas = req.params.codigo;
  try{
    const turmasCadastrada = await Turmas.findOne({ where: { codigo: codigoTurmas } });
    if(turmasCadastrada){
      delete req.body.codigo;//está aqui para não atrapalhar o fluxo do código, deletando o nome da turma antes de ser feita qualquer alteração
      
      const[numRowsUpdated] = await Turmas.update(req.body,{
        where:{codigo: codigoTurmas}
      });
      if(numRowsUpdated > 0){
        const turmaAtualizada = await Turmas.findOne({where: { codigo: codigoTurmas}});
        return res.send({ message:'Turma Atualizada com sucesso', turmacomdadosnovos: turmaAtualizada});
      }
      else{
        return res.send('Turma encontrada, porem sem novos dados para atualizar')
      }
    }
    else{
      return res.status(404).send('Não existe nenhumanturma cadastrada com este código');
    }
    
  }
  catch(error){
  console.error("Erro ao atualizar turma:", error);
  return res.status(500).send("Ocorreu um erro ao atualizar a turma");
  }
}