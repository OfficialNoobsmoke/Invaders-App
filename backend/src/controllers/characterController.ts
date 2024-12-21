import { Request, Response } from 'express';
import characterRepository from '../repositories/characterRepository';

export const createCharacter = async (req: Request, res: Response) => {
  const { name, faction, characterClass, ownerId, realmServerId } = req.body;

  const newCharacter = await characterRepository.createCharacter(
    name,
    faction,
    characterClass,
    ownerId,
    realmServerId
  );

  return res.status(201).json(newCharacter);
};

export const getCharactersByUserIdController = async (
  req: Request,
  res: Response
) => {
  const { ownerId } = req.params;

  const characters = await characterRepository.getCharactersByUserId(ownerId);

  return res.status(200).json(characters);
};

export const getCharacterByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const character = await characterRepository.getCharacterById(id);

  return res.status(200).json(character);
};

export const updateCharacterController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedCharacter = await characterRepository.updateCharacter(
    id,
    updatedData
  );

  return res.status(200).json(updatedCharacter);
};

export const deleteCharacterController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await characterRepository.deleteCharacterById(id);

  return res.status(204);
};
