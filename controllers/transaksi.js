const {Transaksi, Perusahaan, Barang, sequelize} = require('../models')
const CsvParser = require("json2csv").Parser;

class TransaksiControllers {
    static async addTransaksi (req, res, next) {
        const { nama_perusahaan, nama_barang, total_barang } = req.body
        const t = await sequelize.transaction();
        try {
            const perusahaan = await Perusahaan.findOne({
                where: {
                    nama: nama_perusahaan.toLowerCase()
                }
            })
            
            if(!perusahaan) {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Data perusahaan tidak ditemukan"}]
                })
            }

            const barang = await Barang.findOne({
                where: {
                    nama: nama_barang.toLowerCase()
                }
            })
            if(barang) {
                if(barang.stock < total_barang) {
                    return next({
                        name : 'Bad Request',
                        errors: [{message: `Stock tidak mencukupi, sisa barang hanya ${barang.stock}`}]
                    })
                }
                let sisaBarang = barang.stock - total_barang
                let updateStock = {
                    stock: sisaBarang
                }
                let newStock = await Barang.update(updateStock, {
                    where: {
                        nama: barang.nama
                    },
                    returning: true,
                    plain: true
                })
                
                let totalHarga = total_barang * barang.harga

                let tanggal = new Date();
                let dd = String(tanggal.getDate()).padStart(2, '0');
                let mm = String(tanggal.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = tanggal.getFullYear();
                
                tanggal = `${dd}-${mm}-${yyyy}`;
    
                let payload = {
                    nama_perusahaan,
                    nama_barang,
                    total_barang,
                    harga_barang: barang.harga,
                    grand_total: totalHarga,
                    sisa_barang: newStock[1].dataValues.stock,
                    tanggal_input: tanggal
                }
    
                let newTransaksi = await Transaksi.create(payload)
                
                await t.commit();
                return res.status(201).json({
                    message: "Sukses input transaksi",
                    newTransaksi
                    
                })
            }
            else {
                return next({
                    name : 'Not Found',
                    errors: [{message: "Data barang tidak ditemukan"}]
                })
            }
            
        } catch (error) {
            await t.rollback();
            return next(error)
        }
     
    }
    static async showAllTransaksi (req, res, next) {
        try {
            const transaksi = await Transaksi.findAll({
                order: [['createdAt', 'ASC']]
            })
            return res.status(200).json({
                transaksi
            })
            
        } catch (error) {
            return next(error)
        }
     
    }

    static async exportData (req, res, next) {
        try {
            await Transaksi.findAll().then((objs) => {
                let transaksis = [];
                objs.forEach((obj) => {
                  const { tanggal_input, nama_perusahaan, nama_barang, total_barang, harga_barang, grand_total, sisa_barang } = obj;
                  transaksis.push({ tanggal_input, nama_perusahaan, nama_barang, total_barang, harga_barang, grand_total, sisa_barang });
                });
                const csvFields = [ 
                    'tanggal_input',
                    'nama_perusahaan',
                    'nama_barang',
                    'total_barang',
                    'harga_barang',
                    'grand_total',
                    'sisa_barang'
                ];
                const csvParser = new CsvParser({ csvFields });
                const csvData = csvParser.parse(transaksis);
                res.setHeader("Content-Type", "text/csv");
                res.setHeader("Content-Disposition", "attachment; filename=data.csv");
                res.status(200).end(csvData);
              });

            
        } catch (error) {
            return next(error)
        }

    }
}

module.exports = TransaksiControllers