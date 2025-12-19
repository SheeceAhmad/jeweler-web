const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); 

// Login page
router.get('/login', (req,res) => {
    res.render('admin/login', { error: null });
});

// Handle login
router.post('/login', async (req,res) => {
    const { email, password } = req.body;

    console.log("Entered email:", email);
    console.log("Password from form:", password);
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.render('admin/login', { error: " hi Invalid email or password" });
        }
        console.log("Password in DB:", user.password);

        const match = await bcrypt.compare(password, user.password); // hashed
        if(!match){
            return res.render('admin/login', { error: "Invalid email or password" });
        }
        // Save session
        req.session.userId = user._id;
        req.session.userRole = user.role;
        // Redirect based on role
        if(user.role === 'admin'){
            res.redirect('/admin/dashboard');  
        } else {
            res.redirect('/'); // normal user
        }

    } catch(err){
        console.log(err);
        res.render('admin/login', { error: "Server error" });
    }
});

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;

