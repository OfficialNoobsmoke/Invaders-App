import { Types } from "mongoose";
import IRole from "./IRole"

interface Iuser extends Document {
    discordId: string;
    username: string
    displayName: string
    email: string
    factions: string
    highestRole: string
    joinedAt: string;
    administrator: boolean;
    roles: Types.Array<IRole>;
  }

export default Iuser