import mongoose from "mongoose";

const URL="mongodb+srv://officialzedro:MeIRYBXWSB7ONvaj@start.ysrnyw1.mongodb.net/?retryWrites=true&w=majority&appName=Start"

export const connectDB = async () => {
   try {
     await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("database Has Beeen Successfully Connected To Your Project ")
   } catch (error) {
    console.log(error.message)
   }
};