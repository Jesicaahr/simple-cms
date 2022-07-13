const router = require("express").Router();
const userRouter = require("./user");
const barangRouter = require("./barang")
const perusahaanRouter = require("./perusaan")

router.use("/users", userRouter);
router.use("/barang", barangRouter)
router.use("/perusahan", perusahaanRouter)

module.exports = router;