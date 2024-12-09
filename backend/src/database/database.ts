import mongoose from 'mongoose';
import User from './schemas/userSchema';
import dbConstants from '../constants/db';

class MongoDB {
  constructor() {
    this.connect().then(() =>
      console.log('Successfully connected to MongoDB using Mongoose!')
    );
  }

  async connect() {
    try {
      const { DB_CONNECTION_STRING } = process.env;
      if (!DB_CONNECTION_STRING) {
        throw new Error(dbConstants.COULD_NOT_CONNECT_TO_DB);
      }
      await mongoose.connect(DB_CONNECTION_STRING, {});
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async insertUser(obj: typeof User.prototype | null) {
    try {
      const user = new User(obj);
      await user.save();
      console.log(`A user was inserted with the id: ${user.id}`);
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }

  async findUserById(id: string) {
    try {
      const user = await User.findOne({ discordId: id });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
    }
  }
}

export default MongoDB;
