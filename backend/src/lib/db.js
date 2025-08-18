
import mongoose from 'mongoose';
import "dotenv/config";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("mongodb connected")
  } catch (error) {
    console.log(error)
  }
}

export default connectDb;