import { Request, Response } from 'express';
import characterService from './characterService';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import { ValidationError } from '../../shared/exceptions/validationError';

export const createCharacter = async (req: Request, res: Response) => {
  const {
    name,
    faction,
    class: characterClass,
    realmServerId,
    specializations,
    charactersPreferredInstances,
    charactersSavedInstances,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array().map((error) => error.msg));
  }

  const newCharacter = await characterService.createCharacter(
    name,
    faction,
    characterClass,
    req.user.id,
    realmServerId,
    specializations,
    charactersPreferredInstances,
    charactersSavedInstances
  );

  res.status(HttpStatusCode.Created).json(newCharacter);
};

export const getCharactersByUserId = async (req: Request, res: Response) => {
  const { filterModel, sortModel } = req.body;
  let { userId } = req.params;
  const { page = '1', limit = '25' } = req.query;
  if (!userId) {
    userId = req.user.id;
  }
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const result = await characterService.getCharactersByUserId(
    userId,
    pageNum,
    limitNum,
    filterModel.items,
    sortModel
  );

  res.status(HttpStatusCode.Ok).json(result);
};

export const getCharacterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const character = await characterService.getCharacterById(id);

  res.status(HttpStatusCode.Ok).json(character);
};

export const updateCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedCharacter = await characterService.updateCharacter(
    id,
    updatedData
  );

  res.status(HttpStatusCode.Ok).json(updatedCharacter);
};

export const deleteCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;

  await characterService.deleteCharacterById(id);

  res.status(HttpStatusCode.NoContent).send();
};

export const getCharacterFromExternalSource = async (
  req: Request,
  res: Response
) => {
  const { characterName, realmServerId } = req.params;

  const character = await characterService.getCharacterFromExternalSource(
    characterName,
    realmServerId
  );

  res.status(HttpStatusCode.Ok).json(character);
};

export default {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  getCharacterFromExternalSource,
};
