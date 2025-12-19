// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

async function createAdmin() {
    const email = "admin@example.com";
    const existingAdmin = await User.findOne({ email });
    if(existingAdmin){
        console.log("Admin already exists");
        mongoose.disconnect();
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = new User({
        email,
        password: hashedPassword,
        role: "admin"
    });

    await admin.save();
    console.log("Admin user created");
    mongoose.disconnect();
}

createAdmin();
