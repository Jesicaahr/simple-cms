'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perusahaan extends Model {
    static associate(models) {
    }
  };
  Perusahaan.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Mohon masukkan nama perusahaan`,
        },
        notEmpty: {
          args: true,
          msg: `Mohon masukkan nama perusahaan`,
        },
      },
    } ,
    kode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Kode perusahaan tidak boleh sama"
      },
      validate: {
        notNull: {
          args: true,
          msg: `Mohon masukkan kode perusahaan`,
        },
        notEmpty: {
          args: true,
          msg: `Mohon masukkan kode perusahaan`,
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Perusahaan',
    hooks: {
      beforeCreate(perusahaan, option) {
        perusahaan.nama = perusahaan.nama.toLowerCase()
        perusahaan.kode = perusahaan.kode.toLowerCase()
      }
    }
  });
  return Perusahaan;
};