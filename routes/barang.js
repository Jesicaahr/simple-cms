const router = require("express").Router();
const BarangControllers = require('../controllers/barang')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', BarangControllers.addBarang)
router.get('/', BarangControllers.showAllBarang)


module.exports = router;