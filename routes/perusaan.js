const router = require("express").Router();
const PerusahaanControllers = require('../controllers/perusahaan')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', PerusahaanControllers.addPerusahaan)
router.get('/', PerusahaanControllers.showAllPerusahaan)


module.exports = router;