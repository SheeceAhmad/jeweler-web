const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

function isAdmin(req, res, next) {
    if (req.session.userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ error: "Access Denied" });
    }
}
router.get("/dashboard", isAdmin, async (req, res) => {
    try {
        const products = await Product.find();
        res.render("admin/dashboard", { products });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.post("/product", isAdmin, async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct); // Return the object so frontend can use it
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/product/:id", isAdmin, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/product/delete/:id", isAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;