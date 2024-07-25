import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  mainSpec: { type: String, required: true },
  gearScoreMainSpec: { type: Number, required: true },
  offSpec: { type: String, default: null },
  gearScoreOffSpec: { type: Number, default: null },
  skill: { type: Number, default: null },
  faction: { type: String, enum: ["Alliance", "Horde"], required: true },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  username: { type: String, required: true },
  display_name: { type: String, required: true },
  email: { type: String, default: null },
  roles: { type: [String], required: true },
  characters: { type: [characterSchema], default: null },
  administrator: { type: Boolean, default: null },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
