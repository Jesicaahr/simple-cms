const router = require('express').Router()
const TransaksiControllers = require('../controllers/transaksi')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', TransaksiControllers.addTransaksi)
router.get('/', TransaksiControllers.showAllTransaksi)
router.get('/export-data', TransaksiControllers.exportData)

module.exports = router