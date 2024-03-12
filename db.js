require("dotenv").config();
const mongoose = require("mongoose");
const dbInitialise = async () => {
    try {
        await mongoose.connect(process.env.mongodb);
        console.log("Database connected successfully");
        const fetchedData = mongoose.connection.db.collection("fooditems");
        const category = mongoose.connection.db.collection("foodcategory");
        const catData = await category.find({}).toArray();
        const data = await fetchedData.find({}).toArray();
        global.food_items = data;
        global.food_category= catData;
    } catch (error) {
        console.log(`Failed to connect to database: ${error}`);
    }
};

module.exports = dbInitialise;
