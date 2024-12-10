import { Request, Response } from 'express';
import Role from '../database/schemas/roleSchema';

const createRole = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const newRole = new Role({ name });
  await newRole.save();
  return res.status(201).json({ message: 'Role created', role: newRole });
};

const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
  const roles = await Role.find();
  return res.status(200).json(roles);
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  const roleId = req.params.id;
  const deletedRole = await Role.findByIdAndDelete(roleId);
  if (!deletedRole) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ message: 'User deleted' });
};

export default {
  getAllRoles,
  createRole,
  deleteRole,
};
