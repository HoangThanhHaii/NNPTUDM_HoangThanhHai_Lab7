const Inventory = require("../models/Inventory");

exports.getAll = async (req, res) => {
    const data = await Inventory.find().populate("product");
    res.json(data);
};

exports.getById = async (req, res) => {
    const data = await Inventory.findById(req.params.id).populate("product");
    res.json(data);
};

// Add stock
exports.addStock = async (req, res) => {
    const { product, quantity } = req.body;

    const inv = await Inventory.findOne({ product });

    inv.stock += quantity;
    await inv.save();

    res.json(inv);
};

// Remove stock
exports.removeStock = async (req, res) => {
    const { product, quantity } = req.body;

    const inv = await Inventory.findOne({ product });

    if (inv.stock < quantity)
        return res.status(400).json({ msg: "Not enough stock" });

    inv.stock -= quantity;
    await inv.save();

    res.json(inv);
};

// Reservation
exports.reservation = async (req, res) => {
    const { product, quantity } = req.body;

    const inv = await Inventory.findOne({ product });

    if (inv.stock < quantity)
        return res.status(400).json({ msg: "Not enough stock" });

    inv.stock -= quantity;
    inv.reserved += quantity;

    await inv.save();

    res.json(inv);
};

// Sold
exports.sold = async (req, res) => {
    const { product, quantity } = req.body;

    const inv = await Inventory.findOne({ product });

    if (inv.reserved < quantity)
        return res.status(400).json({ msg: "Not enough reserved" });

    inv.reserved -= quantity;
    inv.soldCount += quantity;

    await inv.save();

    res.json(inv);
};