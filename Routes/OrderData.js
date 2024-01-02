const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')


router.post('/orderData' , async (req,res)=>{
    let data = await req.body.order_data
    // await data.splice(0,0,{order_data : req.body.order_data})
    let email = await req.body.email;
    // console.log(email , data);
    let eID = await Order.findOne({email})
    let time = await req.body.time;
    // console.log(time);
    if(eID==null){
        await Order.create({
            email : req.body.email,
            order_data : [data],
            time : time
        }).then(async ()=>{
            // console.log(new Date());
            // res.json({success : 'true'})
            res.json({check : await Order.findOne({"email" : email})})
        }).catch((err)=>{
            console.log(err);
            res.send(err.message)
        })
    }
    else{
        await Order.findOneAndUpdate({email:email} ,{
            $push:{order_data : data}
        }).then(()=>{
            res.json({success : 'true'})
        }).catch((err)=>{
            console.log(err.message);
            res.send(err.message)
        })
    }
})



router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        // console.log(await eId[0].time)
        let orders = eId.order_data
        let ttlorders = []
        orders.map((item,idx)=>{
            item.reverse().map((A,B)=>{
                ttlorders.push(A);
            })
        })
        res.status(200).send( ttlorders)
        // res.json({orderData:eId})
    } catch (error) {
        res.status(500).send([])
    }
    

})
module.exports = router