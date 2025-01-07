import { Request, Response } from 'express';
import { CharacterResponseDto } from '../interfaces/character';
import characterService from '../services/characterService';
import { HttpStatusCode } from 'axios';
import { characters } from '../database/schema';

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
  const { filterModel, sortModel } = req.body;
  let { userId } = req.params;
  const { page = '1', pageSize = '25' } = req.query;
  if (!userId) {
    userId = req.user.id;
  }
  const pageNum = parseInt(page as string, 10);
  const pageSizeNum = parseInt(pageSize as string, 10);

  type AllowedCharacterFields = Pick<
    CharacterResponseDto,
    | 'name'
    | 'faction'
    | 'class'
    | 'realmServerId'
    | 'id'
    | 'ownerId'
    | 'createdAt'
  >;

  const columnMapping: Record<keyof AllowedCharacterFields, string> = {
    name: characters.name.name,
    faction: characters.faction.name,
    class: characters.class.name,
    realmServerId: characters.realmServerId.name,
    createdAt: characters.createdAt.name,
    id: characters.id.name,
    ownerId: characters.ownerId.name,
  };

  const result = await characterService.getCharactersByUserId(
    userId,
    pageNum,
    pageSizeNum,
    filterModel.items,
    sortModel,
    columnMapping
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

export default {
  createCharacter,
  getCharactersByUserId,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
