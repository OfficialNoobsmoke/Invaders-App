import mongoose from "mongoose";
import User from "./schemas/UserSchema";

const { DB_USER, DB_NAME, DB_USER_PWD } = process.env;

if (!DB_USER || !DB_USER_PWD || !DB_NAME) {
  throw new Error("One or more Mongo environment variables are missing");
}

const uri = `mongodb+srv://${DB_USER}:${DB_USER_PWD}@clusterinvaders.wavmtox.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

class MongoDB {
  async connect() {
    try {
      await mongoose.connect(uri, {});
      console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  async insertUser(obj: any) {
    try {
      const user = new User(obj);
      await user.save();
      console.log(`A user was inserted with the _id: ${user._id}`);
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  }
}

export default MongoDB;
