import { Request, Response, NextFunction } from 'express';
import { Permissions } from '../constants/permissions';
import User from '../database/schemas/userSchema';
import IRole from '../interfaces/IRole';

const checkPermissions = (requiredPermissions: Permissions[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: 'Forbidden: User not authenticated' });
    }
    const userId = req.user.discordId;

    const user = await User.findOne({ discordId: userId }).populate<{
      roles: IRole[];
    }>('Role');

    const hasPermission = user?.roles.some((role) =>
      requiredPermissions.every((permission) =>
        role.permissions.includes(permission)
      )
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: 'Forbidden: You do not have the required permissions',
      });
    }

    next();
  };
};

export default checkPermissions;
