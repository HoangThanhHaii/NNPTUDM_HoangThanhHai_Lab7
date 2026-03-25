const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use("/products", require("./routes/productRoutes"));
mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB")
    .then(() => console.log("MongoDB connected"));

app.use("/inventory", require("./routes/inventoryRoutes"));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});