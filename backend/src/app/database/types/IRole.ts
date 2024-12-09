import { Types } from "mongoose";
import IUser from "./IUser"

interface IRole extends Document {
    name: string;
    permissions: Types.Array<string>;
    users: Types.Array<IUser>;
  }

export default IRole