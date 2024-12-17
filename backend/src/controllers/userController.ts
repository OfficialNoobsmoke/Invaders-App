import { Request, Response } from 'express';
import User from '../database/schema/user';
import Role from '../database/schema/roleSchema';
import { AssignRoleToUserRequest } from '../interfaces/userRequest';

export const assignRoleToUser = async (
  req: Request<object, object, AssignRoleToUserRequest>,
  res: Response
): Promise<Response> => {
  const { userId, roleName } = req.body;

  const user = await User.findById(userId).populate('Role');
  if (!user) {
    throw new Error('User not found');
  }

  const role = await Role.findOne({ name: roleName });
  if (!role) {
    throw new Error('Role not found');
  }

  if (user.roles.some((r) => r._id.equals(role._id))) {
    throw new Error('User already has this role');
  }

  user.roles.push(role._id);

  await user.save();

  return res.status(200).json({
    message: 'Role assigned successfully',
    user,
  });
};
