'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaksi.init({
    nama_perusahaan: DataTypes.STRING,
    nama_barang: DataTypes.STRING,
    total_barang: DataTypes.INTEGER,
    harga_barang: DataTypes.INTEGER,
    grand_total: DataTypes.INTEGER,
    sisa_barang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaksi',
  });
  return Transaksi;
};