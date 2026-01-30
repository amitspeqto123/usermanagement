import mongoose from "mongoose";

export const databaseConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully")
    }catch(error){
        console.log("Database connection faield");
    }
}