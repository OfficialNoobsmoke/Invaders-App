import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCharacter } from '../services/characterService';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { CreateCharacter } from '../dto/characterDto';

export default function CharacterDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { message, characterId, mode } = location.state || {};

  useEffect(() => {
    if (!mode) {
      navigate(-1);
    }
  }, [mode, navigate]);

  const dummyCharacter = {
    name: 'Test',
    faction: 'Alliance',
    class: 'Warrior',
    realmServerId: 'a1e0b3b5-1b86-4eb6-92b3-5bed64b35619',
    specializations: [
      { name: 'Fury', gearScore: 6100 },
      { name: 'Protection', gearScore: 6200 },
    ],
    charactersPreferredInstances: ['673959db-e736-457c-bc7b-753f9972d977', '9e2e8d17-51c8-4ab6-8613-5d60e1dbb977'],
    charactersSavedInstances: ['9e2e8d17-51c8-4ab6-8613-5d60e1dbb977', '6328a2a7-85cb-4658-a8dc-de517cc63efa'],
    createdAt: new Date().toISOString(),
  } as CreateCharacter;

  const createCharacterMutation = useMutation({
    mutationFn: () => createCharacter(dummyCharacter),
    onError: (error: AxiosError) => {
      console.error('Character creation failed:', error.response?.data || error.message);
    },
  });

  return (
    <div>
      {message} {characterId} {mode}
      <ButtonWrapper
        onClick={() => {
          createCharacterMutation.mutate();
        }}>
        Create Character
      </ButtonWrapper>
    </div>
  );
}
