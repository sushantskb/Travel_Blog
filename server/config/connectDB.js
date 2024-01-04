const mongoose = require("mongoose");

exports.connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to DB");
    } catch(err){
        console.log("Connection Error" + err);
    }
}