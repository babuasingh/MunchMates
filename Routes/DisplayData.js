const express = require('express')
const router = express.Router()







router.post('/foodData',async (req,res)=>{
    try {
<<<<<<< HEAD
        console.log([global.food_items,global.foodCategory])
=======
        console.log(global.food_items)
>>>>>>> ea4c2a9b5146cfb87d053b2cc61b7f2ad138f036
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})


module.exports = router
