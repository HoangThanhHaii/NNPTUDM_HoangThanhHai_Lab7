const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});


const Inventory = require("./Inventory");

productSchema.post("save", async function (doc) {
    await Inventory.create({
        product: doc._id
    });
});

module.exports = mongoose.model("Product", productSchema);