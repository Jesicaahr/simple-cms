'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    static associate(models) {
      // define association here
    }
  };
  Barang.init({
    nama: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: {
			args: true,
			msg: "Nama tidak boleh sama"
		},
		validate: {
			notNull: {
				args: true,
				msg: `Mohon masukkan nama barang`,
			},
			notEmpty: {
				args: true,
				msg: `Mohon masukkan nama barang`,
			},
		},
    } ,
    harga: {
		type: DataTypes.NUMBER,
		allowNull: false,
		validate: {
			notNull: {
				args: true,
				msg: `Mohon masukkan harga barang`,
			},
			notEmpty: {
				args: true,
				msg: `Mohon masukkan harga barang`,
			},
			isGreaterThanZero() {
				if (this.harga < 0) {
					throw new Error("Harga harus lebih besar dari 0");
				}
			}
		},
	},
    stock: {
		type: DataTypes.NUMBER,
		allowNull: false,
		validate: {
			notNull: {
				args: true,
				msg: `Mohon masukkan stock barang`,
			},
			notEmpty: {
				args: true,
				msg: `Mohon masukkan stock barang`,
			},
			isGreaterThanZero() {
				if (this.stock < 0) {
					throw new Error("Stock harus lebih besar dari 0");
				}
			}
		},
	}
  }, {
    sequelize,
    modelName: 'Barang',
	hooks: {
		beforeCreate(barang, option) {
		  barang.nama = barang.nama.toLowerCase()
		}
	}
  });
  return Barang;
};