const {Perusahaan} = require('../models')

class PerusahaanControllers {
    static async addPerusahaan (req, res, next) {
        const { nama, harga, stock } = req.body
        try {
            const newBarang = await Barang.create({
                nama, harga, stock
            })
            return res.status(201).json({
                message: "Sukses menambahkan barang",
                newBarang
            })
            
            
        } catch (error) {
            return next(error)
        }
     
    }
    static async showAllPerusahaan (req, res, next) {
        try {
            const barang = await Barang.findAll()
            return res.status(200).json({
                barang
            })
            
        } catch (error) {
            return next(error)
        }
     
    }
}

module.exports = PerusahaanControllers