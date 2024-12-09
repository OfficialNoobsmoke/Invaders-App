import mongoose, { Document, Types } from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: { type: [String], required: false, default: undefined},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Role = mongoose.model("Role", roleSchema, "roles");

export default Role;