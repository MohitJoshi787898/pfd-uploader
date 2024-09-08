const mongoose=require("mongoose");
const  dotenv=require("dotenv");
dotenv.config();
 const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://mj787898:god1234@cluster0.cj8on.mongodb.net/",{
            useNewUrlParser:true,
            useUnifiedTopology: true,
           
        })
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports =connectDB