import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDatabase = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((c) => {
        console.log(`Database connected with ${c.connection.host}`);
      });
  } catch (error) {
    console.log(error);
  }
};