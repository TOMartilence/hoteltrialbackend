require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 2 }), 
    body('password').isLength({ min: 7 }) 
], async (req, res) => {
    const validationIssues = validationResult(req);
    const { name, email, password, location } = req.body;

    if (!validationIssues.isEmpty()) {
        return res.status(400).json({ validationIssues: validationIssues.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 

        await User.create({
            name: name,
            password: hashedPassword,
            email: email,
            location: location
        });

        res.status(200).json({ success: true, message: "Welcome to the club" });
    } catch (error) {
        console.log(`There was an error in adding the user into the database ${error}`);
        res.status(400).json({ success: false });
    }
});

router.post("/loginuser", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const data = {
            currentUser : {
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,process.env.Secretkey);
        return res.status(200).json({ success: true, message: "Login successful" ,authtoken:authtoken});
    } catch (error) {
        console.error(`Error logging in user: ${error}`);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
