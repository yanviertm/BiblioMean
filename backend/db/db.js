import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTION SUCCESS");
  } catch (error) {
      console.log("ERROR IN CONNECTION:\n"+error);
  }
};
export default { dbConnection };
