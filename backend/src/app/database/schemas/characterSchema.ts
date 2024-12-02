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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model("Character", characterSchema, "characters");

export default User;