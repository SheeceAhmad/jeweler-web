const express = require("express");
const path = require("path");
const session = require('express-session');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const methodOverride = require('method-override');
const Order = require('./models/Order');

const app = express();

app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "adminsecret",
    resave: false,
    saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error:", err));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Home
app.get("/", (req, res) => {
    res.render("pages/index");
});

// Products
app.get('/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6; 
        const skip = (page - 1) * limit;

        let query = {};
        if (req.query.category && req.query.category !== 'all') query.category = req.query.category;

        const products = await Product.find(query).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        res.render('pages/products', { products, currentPage: page, totalPages, currentCategory: req.query.category || 'all' });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Product details
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.redirect('/');
        res.render("pages/product-details", { product });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// Other pages
app.get("/services", (req,res) => res.render("pages/services"));
app.get("/contact", (req,res) => res.render("pages/contact"));

// Checkout page
app.get("/checkout", (req,res) => {
    res.render("pages/checkout"); // Cart will come from localStorage via JS
});

// Customer order history
app.get('/my-orders', (req, res) => res.render('pages/myOrders', { orders: null, email: '' }));

app.post('/my-orders', async (req, res) => {
    const { email } = req.body;
    try {
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        res.render('pages/myOrders', { orders, email });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Place order
app.post('/order/place', async (req,res) => {
    try {
        const { fullName, email, phone, address, paymentMethod, cartData, coupon } = req.body;
        const cart = JSON.parse(cartData || '[]');
        if (!cart.length) return res.send('Cart is empty');

        let subtotal = cart.reduce((acc,item) => acc + item.price*item.quantity, 0);
        let discount = coupon === 'SAVE10' ? subtotal*0.10 : 0;
        let total = subtotal - discount;

        const order = new Order({
            fullName, email, phone, address, paymentMethod,
            cart, coupon: coupon || null, discount, total, status: 'Placed'
        });

        await order.save();
        res.redirect(`/order/success/${order._id}`);
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Success page
app.get('/order/success/:id', async (req,res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.send('Order not found');
        res.render('pages/success', { order });
    } catch(err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Auth/Admin routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
