const {Perusahaan} = require('../models')

class PerusahaanControllers {
    static async addPerusahaan (req, res, next) {
        const { nama, kode } = req.body
        try {
            const newPerusahaan = await Perusahaan.create({
                nama, kode
            })
            return res.status(201).json({
                message: "Sukses menambahkan perusahaan",
                newPerusahaan
            })
        } catch (error) {
            return next(error)
        }
     
    }
    static async showAllPerusahaan (req, res, next) {
        try {
            const perusahaan = await Perusahaan.findAll()
            return res.status(200).json({
                perusahaan
            })
            
        } catch (error) {
            return next(error)
        }
     
    }
}

module.exports = PerusahaanControllers