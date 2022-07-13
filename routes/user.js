const router = require("express").Router();
const UserControllers = require('../controllers/user')

router.post('/register', UserControllers.register)
router.post('/login', UserControllers.login)


module.exports = router;