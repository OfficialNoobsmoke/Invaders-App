import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true },
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, default: undefined },
  factions: { type: [String], required: true },
  highestRole: { type: String, required: true },
  joinedAt: { type: String, default: null },
  administrator: { type: Boolean, default: undefined },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
