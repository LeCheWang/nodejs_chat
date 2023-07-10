const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://root:123@cluster0.63tihom.mongodb.net/demo_app_chat?retryWrites=true&w=majority")
        console.log("kết nối db thành công");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;