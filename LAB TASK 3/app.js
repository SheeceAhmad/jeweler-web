const express = require("express");
const path = require("path");
// const session = require('express-session');
// const mongoose = require('mongoose');
// const Product = require('./models/Product');
// const authRoutes = require('./routes/auth');
// const adminRoutes = require('./routes/admin');

const app = express();
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true })); 
// app.use(express.json()); 

// app.use(session({
//     secret: "adminsecret",
//     resave: false,
//     saveUninitialized: false
// }));

// mongoose.connect('mongodb://localhost:27017')
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.log("Error:", err));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.get("/", (req, res) => {
    res.render("pages/index");
});
app.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6; 
        const skip = (page - 1) * limit;

        let query = {};
        if (req.query.category && req.query.category !== 'all') {
            query.category = req.query.category;
        }

        const products = await Product.find(query)
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('pages/products', {
            products: products,
            currentPage: page,
            totalPages: totalPages,
            currentCategory: req.query.category || 'all'
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.redirect('/'); 
        }
        res.render("pages/product-details", { product });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});
app.get("/services", (req,res) => {
    res.render("pages/services");
});
app.get("/contact", (req,res) => {
    res.render("pages/contact");
});
app.get("/checkout", (req,res) => {
    res.render("pages/checkout");
})

// app.use("/auth", authRoutes);
// app.use("/admin", adminRoutes);

module.exports = app;



