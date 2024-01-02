
const mongoose = require('mongoose')
const mongoURL= process.env.DATABASE


const mongoDB =()=>{
    // console.log(process.env.DATABASE);
    mongoose.connect(mongoURL,{
        })
    .then(async ()=>{
        console.log("connected to the DB");
        try {     
            const fetchdata = await mongoose.connection.db.collection("food_items");
            const foodCategory = await mongoose.connection.db.collection("food_category");
            global.food_items = await fetchdata.find({}).toArray()
            global.foodCategory = await foodCategory.find({}).toArray();
            // console.log(global.food_items,global.foodCategory);
        } catch (error) {
            console.log(error.message);
        }

    }).catch((err)=>{
        console.log(err.message);
    })


    // mongoose.connection.on('connected',()=>{
    //     console.log("mongoose is connected to the DB");
    // })

    // mongoose.connection.on('error',(err)=>{
    //     console.log(err.message);
    // })

    mongoose.connection.on('disconnected',()=>{
        console.log('Mongoose connection is disconnected');
    })
    
    
    process.on('SIGINT',async()=>{
        await mongoose.connection.close()
        process.exit(0)
    })


}

module.exports = mongoDB