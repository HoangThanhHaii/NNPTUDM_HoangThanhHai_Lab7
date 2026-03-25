const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/inventoryController");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

router.post("/add-stock", ctrl.addStock);
router.post("/remove-stock", ctrl.removeStock);
router.post("/reservation", ctrl.reservation);
router.post("/sold", ctrl.sold);

module.exports = router;