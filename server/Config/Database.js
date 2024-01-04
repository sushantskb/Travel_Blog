const mongoose = require("mongoose");

exports.connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("Error Occured");
    }
}