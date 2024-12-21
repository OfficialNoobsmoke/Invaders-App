import { Request, Response } from 'express';
import characterService from '../services/characterService';

export const createCharacter = async (req: Request, res: Response) => {
  const { name, faction, characterClass, ownerId, realmServerId } = req.body;

  const newCharacter = await characterService.createCharacter(
    name,
    faction,
    characterClass,
    ownerId,
    realmServerId
  );

  res.status(201).json(newCharacter);
};

export const getCharactersByUserId = async (req: Request, res: Response) => {
  const { ownerId } = req.params;

  const characters = await characterService.getCharactersByUserId(ownerId);

  res.status(200).json(characters);
};

export const getCharacterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const character = await characterService.getCharacterById(id);

  res.status(200).json(character);
};

export const updateCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedCharacter = await characterService.updateCharacter(
    id,
    updatedData
  );

  res.status(200).json(updatedCharacter);
};

export const deleteCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;

  await characterService.deleteCharacterById(id);

  res.status(204).send();
};
