import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    const connectionInstance = await mongoose.connect(dbURI);
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
