import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  mainSpec: { type: String, required: true },
  gearScoreMainSpec: { type: Number, required: true },
  offSpec: { type: String, default: undefined },
  gearScoreOffSpec: { type: Number, default: undefined },
  skill: { type: Number, default: undefined },
  faction: { type: String, enum: ["Alliance", "Horde"], required: true },
});

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  discordId: { type: String, required: true },
  username: { type: String, required: true },
  display_name: { type: String, required: true },
  email: { type: String, default: undefined },
  factions: { type: [String], required: true },
  highestRole: { type: String, required: true },
  joinedAt: { type: String, default: null },
  characters: { type: [characterSchema], default: undefined },
  administrator: { type: Boolean, default: undefined },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
