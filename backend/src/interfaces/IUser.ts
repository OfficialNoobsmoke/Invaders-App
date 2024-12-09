import { Types } from 'mongoose';
import IRole from './IRole';

interface IUser extends Document {
  discordId: string;
  username: string;
  displayName: string;
  email: string;
  factions: string;
  highestRole: string;
  joinedAt: string;
  administrator: boolean;
  roles: Types.Array<IRole>;
}

export default IUser;
