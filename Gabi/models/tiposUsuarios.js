const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const UsuariosTurmas = sequelize.define("usuarios_turmas", {
    //define as informações da tabela colunas
    Turmas_idTurmas:{
      type: Sequelize.INTEGER,
      primaryKey: false,
    },


    Usuarios_idUsuarios: {
      type: Sequelize.INTEGER,
      primaryKey: false,
  },
  //precisa disso pq nao tem as colunas createdAt e updatedAt no bd timestamps: false // Adiciona colunas createdAt e updatedAt automaticamente
    timestamps: false, // Adiciona colunas createdAt e updatedAt automaticamente
  }
);
UsuariosTurmas.removeAttribute("id")
module.exports = UsuariosTurmas;