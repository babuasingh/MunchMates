const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = "somerandomgeneratedKeyandPasswordAccordingtoourneed"



router.post('/createuser',
    body('email', "Invalid Email").isEmail(),
    body('name', "Invalid UserName").isLength({ min: 5 }),
    body('password', "Incorrect Password").isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt=await bcrypt.genSalt(10);
        const securePassword =  await bcrypt.hash(req.body.password,salt);


        try {
            const newUser = await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: securePassword
            })

            newUser.save().then(() => {
                // res.send(newUser)
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message);
            // res.send(error.message)     
            res.json({ success: true })
        }
    })





router.post('/loginUser',
    body('email', "Invalid Email").isEmail(),
    body('password', "Incorrect Password").isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        let email = req.body.email;
        try {
            const userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ errors: "email is not registered" })
            }
            // console.log(req.body.password , userdata.password);
            const passwordCompare = await bcrypt.compare(req.body.password,userdata.password)
            if (!passwordCompare) {
                return res.status(400).json({ errors: "Wrong Password" })
            }
            const data = {
                user :{
                    id : userdata.id
                }
            }

            const authToken = jwt.sign(data,secretKey)
            return res.json({ success: "true" , authToken : authToken})
        } catch (error) {
            console.log(error.message);
            // res.send(error.message)     
            res.json({ success: "false" })
        }
    })




    router.get('/allUsers', async (req,res)=>{
        try {
            const allusers = await User.find()
            res.send(allusers)
        } catch (error) {
            res.send(error.message)
        }
    })


module.exports = router