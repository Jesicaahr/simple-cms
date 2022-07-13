const router = require("express").Router();
const userRouter = require("./user");
const barangRouter = require("./barang")
const perusahaanRouter = require("./perusahaan")

router.use("/users", userRouter);
router.use("/barang", barangRouter)
router.use("/perusahaan", perusahaanRouter)

module.exports = router;