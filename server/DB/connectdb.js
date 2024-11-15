const mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI);


async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB connected successfully with DB :",connectionInstance.connection.host);
        // console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection FAILED : ",error);
        process.exit(1)
    }
}

module.exports = connectDB;