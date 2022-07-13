'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  	User.init({
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notNull: {
					args: true,
					msg: `Username tidak boleh kosong`,
				},
				notEmpty: {
					args: true,
					msg: `Username tidak boleh kosong`,
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: `Password tidak boleh kosong`,
				},
				notEmpty: {
					args: true,
					msg: `Password tidak boleh kosong`,
				},
			},
		} 
  	}, {
    sequelize,
    modelName: 'User',
	hooks: {
		beforeCreate(user, option) {
			user.password = encryptPassword(user.password)
		}
	}
  });
  return User;
};