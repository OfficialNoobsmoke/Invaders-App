import { Request, Response } from 'express';
import characterService from '../services/characterService';
import { HttpStatusCode } from 'axios';

export const createCharacter = async (req: Request, res: Response) => {
  const {
    name,
    faction,
    characterClass,
    realmServerId,
    specializations,
    charactersPreferredInstances,
    charactersSavedInstances,
  } = req.body;
  let { ownerId } = req.params;
  if (!ownerId) {
    ownerId = req.user.id;
  }
  const newCharacter = await characterService.createCharacter(
    name,
    faction,
    characterClass,
    ownerId,
    realmServerId,
    specializations,
    charactersPreferredInstances,
    charactersSavedInstances
  );

  res.status(HttpStatusCode.Created).json(newCharacter);
};

export const getCharactersByUserId = async (req: Request, res: Response) => {
  let { userId } = req.params;
  const { page = '1', pageSize = '25' } = req.query;
  if (!userId) {
    userId = req.user.id;
  }
  const pageNum = parseInt(page as string, 10);
  const pageSizeNum = parseInt(pageSize as string, 10);

  const characters = await characterService.getCharactersByUserId(
    userId,
    pageNum,
    pageSizeNum
  );

  res.status(HttpStatusCode.Ok).json(characters);
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

export default {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
