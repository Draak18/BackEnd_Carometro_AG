//models/Usuario.js
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Turmas = sequelize.define(
  "Turmas",
  {
    //define as informações da tabela colunas
    idTurmas: {
      type: Sequelize.INTEGER,
      primaryKey: true, // Define essa coluna como a chave primária
      autoIncrement: true, // Indica que é uma chave primaria autoincrementável
    },
    codigo: Sequelize.STRING,
    descricao: Sequelize.STRING,
    inicio: Sequelize.DATE,
    fim: Sequelize.DATE,
    fotos: Sequelize.STRING,
  },
  //precisa disso pq nao tem as colunas createdAt e updatedAt no bd timestamps: false // Adiciona colunas createdAt e updatedAt automaticamente
  {
    timestamps: false, // Adiciona colunas createdAt e updatedAt automaticamente
  }
);

module.exports = Turmas;
