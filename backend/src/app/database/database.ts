import mongoose from "mongoose";
import User from "./schemas/UserSchema";

const { DB_USER, DB_NAME, DB_USER_PWD } = process.env;

if (!DB_USER || !DB_USER_PWD || !DB_NAME) {
  throw new Error("One or more Mongo environment variables are missing");
}

const uri = `mongodb+srv://${DB_USER}:${DB_USER_PWD}@clusterinvaders.wavmtox.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

class MongoDB {
  constructor() {
    this.connect().then((r) =>
      console.log("Successfully connected to MongoDB using Mongoose!"),
    );
  }

  async connect() {
    try {
      await mongoose.connect(uri, {});
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  async insertUser(obj: any) {
    try {
      const user = new User(obj);
      await user.save();
      console.log(`A user was inserted with the id: ${user.id}`);
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await User.findOne({ discordId: id });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
    }
  }
}

export default MongoDB;
