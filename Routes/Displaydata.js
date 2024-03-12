const express = require("express")
const router = express.Router();

router.post("/fooddata",async(req,res)=>{
    try {
        res.send([global.food_category,global.food_items])
    } catch (error) {
        console.log(`Internal server error in fetching data ${error}`);
    }
})

module.exports = router;