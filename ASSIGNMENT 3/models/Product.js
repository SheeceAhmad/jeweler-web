const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'rings', 'necklaces'
    image: { type: String, required: true },    // e.g., '/assets/product1.png'
    description: { type: String }
});

module.exports = mongoose.model('Product', productSchema);