'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      }) //PessoaID
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      })
      
    }
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        }
      }
    
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING, 
      validate: {
        isEmail: {
          args: true,
          msg: 'dados do tipo e-mail inválidos'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true 
      }, 
       
    },
    scopes: {
      todos: { where: {} },
      // etc: { constraint: valor }
    },
    modelName: 'Pessoas',

  });
  return Pessoas;
};