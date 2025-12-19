const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    address: String,
    paymentMethod: String,
    cart: Array,
    coupon: String,
    total: Number,
    discount: Number,
    status: { type: String, default: "Pending" }, // Pending, Completed, Shipped, etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
