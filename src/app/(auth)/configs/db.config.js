import mongoose from "mongoose";

export const MongoDbCon = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is  Already Connected");
    }else{
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB is Connected Successfully");
    }
  } catch (error) {
    console.log("Something Went Wrong While Connecting MonogDb", error);
  }
};
