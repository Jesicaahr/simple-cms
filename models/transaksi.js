'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    static associate(models) {
    }
  };
  Transaksi.init({
    tanggal_input: {
      type: DataTypes.STRING,
    },
    nama_perusahaan: {
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
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
    total_barang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Mohon masukkan total barang`,
        },
        notEmpty: {
          args: true,
          msg: `Mohon masukkan total barang`,
        },
        isGreaterThanZero() {
          if (this.stock < 0) {
            throw new Error("Total barang harus lebih besar dari 0");
          }
        }
      },
    },
    harga_barang:{
      type: DataTypes.INTEGER,
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
          if (this.stock < 0) {
            throw new Error("Harga barang harus lebih besar dari 0");
          }
        }
      },
    },
    grand_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Mohon masukkan grand total`,
        },
        notEmpty: {
          args: true,
          msg: `Mohon masukkan grand total`,
        },
        isGreaterThanZero() {
          if (this.stock < 0) {
            throw new Error("Grand total harus lebih besar dari 0");
          }
        }
      },
    },
    sisa_barang:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Mohon masukkan sisa barang`,
        },
        notEmpty: {
          args: true,
          msg: `Mohon masukkan sisa barang`,
        },
        isGreaterThanZero() {
          if (this.stock < 0) {
            throw new Error("Sisa barang harus lebih besar dari 0");
          }
        }
      },
    }
  }, {
    sequelize,
    modelName: 'Transaksi',
    hooks: {
      beforeCreate(transaksi, option) {
        transaksi.nama_barang = transaksi.nama_barang.toLowerCase()
        transaksi.nama_perusahaan = transaksi.nama_perusahaan.toLowerCase()
      }
    }
  });
  return Transaksi;
};