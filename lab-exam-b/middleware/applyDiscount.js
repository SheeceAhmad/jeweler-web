// applyDiscount.js
function applyDiscount(req, res, next) {
    const cart = req.body.cart || [];
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let discount = 0;
    const coupon = req.body.coupon || req.query.coupon || '';

    if (coupon.toUpperCase() === 'SAVE10') {
        discount = subtotal * 0.10;
    }

    req.subtotal = subtotal;
    req.discount = discount;
    req.total = subtotal - discount;

    next();
}

module.exports = applyDiscount;
