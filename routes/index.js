const router = require("express").Router();
const userRouter = require("./user");
const barangRouter = require("./barang")
const perusahaanRouter = require("./perusahaan")
const transaksiRouter = require("./transaksi")

router.use("/users", userRouter);
router.use("/barang", barangRouter)
router.use("/perusahaan", perusahaanRouter)
router.use("/transaksi", transaksiRouter)

module.exports = router;