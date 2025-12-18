const mongoose = require('mongoose');
const Product = require('./models/Product');

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        console.log("MONGO CONNECTION OPEN for Seeding");
        seedDB();
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR");
        console.log(err);
    });

// 2. Define Sample Data (12 Items to test pagination)
const seedProducts = [
    // RINGS
    {
        name: "Stella Diamond Ring",
        category: "Rings",
        price: 1299,
        image: "/assets/product_ring_gold.png",
        description: "A stunning diamond solitaire ring."
    },
    {
        name: "Platinum Stone Ring",
        category: "Rings",
        price: 1299,
        image: "/assets/product_ring_silver.png",
        description: "A stunning diamond solitaire ring."
    },
    {
        name: "Diamond Star Ring",
        category: "Rings",
        price: 1299,
        image: "/assets/product_ring2.png",
        description: "A stunning diamond solitaire ring."
    },


    // NECKLACES
    {
        name: "Delicate Heart Necklace",
        category: "Necklaces",
        price: 580,
        image: "/assets/product_heart-necklace.png",
        description: "Minimalist gold chain perfect for layering."
    },
    {
        name: "Pearl Pendant",
        category: "Necklaces",
        price: 450,
        image: "/assets/product_heart-necklace.png",
        description: "Freshwater pearl on a silver chain."
    },
    {
        name: "Sunlight Gold Pendant",
        category: "Necklaces",
        price: 720,
        image: "/assets/product_heart-necklace.png",
        description: "Radiant sun motif in 14k gold."
    },

    // EARRINGS
    {
        name: "Elegance Silver Drops",
        category: "Earrings",
        price: 150,
        image: "/assets/product_earrings.png",
        description: "Sterling silver drop earrings."
    },
    {
        name: "Rose Gold Hoops",
        category: "Earrings",
        price: 320,
        image: "/assets/product_earrings.png",
        description: "Modern rose gold hoops for everyday wear."
    },
        {
        name: "Vintage Gold Earrings",
        category: "Earrings",
        price: 850,
        image: "/assets/product_earrings.png", // Reusing image for demo
        description: "Classic 18k gold band with vintage detailing."
    },
    {
        name: "Sapphire Halo Ring",
        category: "Earrings",
        price: 2100,
        image: "/assets/product_earrings2.png",
        description: "Deep blue sapphire surrounded by diamonds."
    },

    // BRACELETS
    {
        name: "Sapphire Link Bracelet",
        category: "Bracelets",
        price: 950,
        image: "/assets/product_earrings2.png",
        description: "Interlinked bracelet with sapphire accents."
    },
    {
        name: "Diamond Tennis Bracelet",
        category: "Bracelets",
        price: 3500,
        image: "/assets/product_earrings2.png",
        description: "Full circle of diamonds set in white gold."
    },
    {
        name: "Diamond",
        category: "Bracelets",
        price: 300,
        image: "/assets/product_diamond.png",
        description: "Diamond, that's it."
    }
];

// 3. Insert Function
const seedDB = async () => {
    try {
        // Clear existing data first to avoid duplicates
        await Product.deleteMany({});
        console.log("Old data removed...");

        // Insert new data
        await Product.insertMany(seedProducts);
        console.log("Database seeded with 12 products!");
        
    } catch (e) {
        console.log("Error seeding database:", e);
    } finally {
        // Close connection
        mongoose.connection.close();
        console.log("Connection closed.");
    }
};