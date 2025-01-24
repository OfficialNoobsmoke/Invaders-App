import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCharacter } from '../services/characterService';
import ButtonWrapper from '../components/common/ButtonWrapper';
import { ReadCharacter } from '../dto/readCharacter';
import TextFieldWrapper from '../components/common/TextFieldWrapper';
import SelectWrapper from '../components/common/SelectWrapper';
import { Container, List, ListItem, SelectChangeEvent, Stack } from '@mui/material';
import externalService from '../services/externalService';
import { getAllClasses, getClassSpecializations } from '../utils/classAndSpecs';
import { ApplicationDataContext } from '../context/applicationDataContexts';
import { DropdownOptions } from '../interfaces/dropDownOptions';
import { useDebounce } from '@uidotdev/usehooks';
import { general } from '../constants/constants';
import { CreateCharacter } from '../dto/createCharacter';

const RaidSessionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const applicationData = useContext(ApplicationDataContext);

  const { mode, characterData } = (location.state as { mode?: string; characterData?: ReadCharacter }) || {};

  const [createCharacterData, setCreateCharacterData] = React.useState<CreateCharacter>({
    name: characterData?.name || '',
    faction: characterData?.faction || '',
    class: characterData?.class || '',
    realmServerId: characterData?.realmServerId || '',
    specializations: characterData?.specializations.map((s) => ({ id: s.id, name: s.name, gearScore: 0 })) || [],
    charactersPreferredInstances: characterData?.charactersPreferredInstances.map((s) => s.id) || [],
    charactersSavedInstances: characterData?.charactersSavedInstances.map((s) => s.id) || [],
  });
  const [realmServerOptions, setRealmServerOptions] = React.useState<DropdownOptions[]>([]);
  const [specializationOptions, setSpecializationOptions] = useState<DropdownOptions[]>([]);
  const [instancesOptions, setInstancesOptions] = useState<DropdownOptions[]>([]);
  const characterNameDebounce = useDebounce(createCharacterData.name, 1000);

  useEffect(() => {
    if (applicationData) {
      setRealmServerOptions(applicationData.dropdowns.realmServers);
      setInstancesOptions(applicationData.dropdowns.instances);
    }
  }, [applicationData]);

  useEffect(() => {
    if (!mode) {
      navigate(-1);
    }
  }, [mode, navigate]);

  const { data: getCharacterDataFromExternalSource, isLoading: isGetCharacterDataFromExternalSourceLoading } = useQuery(
    {
      queryFn: () => {
        return externalService.getCharacterDataFromExternalSource(
          createCharacterData.name,
          createCharacterData.realmServerId
        );
      },
      queryKey: ['externalCharacterData', characterNameDebounce, createCharacterData.realmServerId],
      retry: false,
      enabled: !!createCharacterData.name && !!createCharacterData.realmServerId,
    }
  );

  const createCharacterMutation = useMutation({
    mutationFn: () => {
      if (!createCharacterData.name || !createCharacterData.realmServerId) {
        throw new Error('Name and Realm-Server are required fields.');
      }
      return createCharacter(createCharacterData);
    },
    onError: (error: AxiosError) => {
      console.error('Character creation failed:', error.response?.data || error.message);
    },
  });

  useEffect(() => {
    if (getCharacterDataFromExternalSource) {
      setCreateCharacterData({
        ...createCharacterData,
        class: getCharacterDataFromExternalSource.class,
        faction: getCharacterDataFromExternalSource.faction,
      });
    }
  }, [getCharacterDataFromExternalSource, createCharacterData]);

  const formatCharacterName = (characterName: string) => {
    const sanitizedName = characterName.replace(/[^a-zA-Z]/g, '').slice(0, 12);
    if (sanitizedName.length > 0) {
      return sanitizedName.charAt(0).toUpperCase() + sanitizedName.slice(1).toLowerCase();
    }
    return sanitizedName;
  };

  const characterNameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = formatCharacterName(event.target.value);
    setCreateCharacterData({ ...createCharacterData, name: newName });
  };

  const factionChangeHandler = (event: SelectChangeEvent<unknown>) => {
    setCreateCharacterData({ ...createCharacterData, faction: event.target.value as string });
  };

  const classChangeHandler = (event: SelectChangeEvent<unknown>) => {
    setCreateCharacterData({ ...createCharacterData, class: event.target.value as string });
  };

  const realmServerChangeHandler = (event: SelectChangeEvent<unknown>) => {
    setCreateCharacterData({ ...createCharacterData, realmServerId: event.target.value as string });
  };

  const specializationNameHandler = (index: number, event: SelectChangeEvent<unknown>) => {
    const updatedSpecializations = [...createCharacterData.specializations];
    updatedSpecializations[index] = {
      ...updatedSpecializations[index],
      name: event.target.value as string,
    };
    setCreateCharacterData({
      ...createCharacterData,
      specializations: updatedSpecializations,
    });
  };

  const specializationGearScoreHandler = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSpecializations = [...createCharacterData.specializations];
    updatedSpecializations[index] = {
      ...updatedSpecializations[index],
      gearScore: Number(event.target.value),
    };
    setCreateCharacterData({
      ...createCharacterData,
      specializations: updatedSpecializations,
    });
  };

  const preferredInstancesHandler = (
    event: SelectChangeEvent<typeof createCharacterData.charactersPreferredInstances>
  ) => {
    const {
      target: { value },
    } = event;
    setCreateCharacterData({
      ...createCharacterData,
      charactersPreferredInstances: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const savedInstancesHandler = (event: SelectChangeEvent<typeof createCharacterData.charactersSavedInstances>) => {
    const {
      target: { value },
    } = event;
    setCreateCharacterData({
      ...createCharacterData,
      charactersSavedInstances: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleCreateCharacter = () => {
    if (!createCharacterData.name || !createCharacterData.realmServerId) {
      console.error('Please fill out all required fields.');
      return;
    }
    createCharacterMutation.mutate();
  };

  const mapClassesToDropDown = () => {
    const classes: { value: string; label: string }[] = [];
    getAllClasses().forEach((cls) => {
      classes.push({ value: cls, label: cls });
    });
    return classes;
  };

  const handleAddSpecialization = () => {
    if (createCharacterData.specializations.length < general.MAX_SPECIALIZATIONS) {
      setCreateCharacterData((prevData) => ({
        ...prevData,
        specializations: [...prevData.specializations, { name: '', gearScore: 0 }],
      }));
    }
  };

  const handleRemoveSpecialization = (index: number) => {
    const updatedSpecializations = createCharacterData.specializations.filter((_, i) => i !== index);
    setCreateCharacterData({
      ...createCharacterData,
      specializations: updatedSpecializations,
    });
  };

  useEffect(() => {
    if (createCharacterData?.class) {
      const specializations = getClassSpecializations(createCharacterData.class);
      setSpecializationOptions(specializations.map((spec) => ({ label: spec, value: spec })));
    }
  }, [createCharacterData?.class]);

  useEffect(() => {
    const realmServerReadonlyCondition = isGetCharacterDataFromExternalSourceLoading || mode === 'edit';
    setIsRealmServerReadOnly(realmServerReadonlyCondition);
  }, [isGetCharacterDataFromExternalSourceLoading, mode]);

  useEffect(() => {
    const characterNameReadonlyCondition =
      isGetCharacterDataFromExternalSourceLoading || !createCharacterData?.realmServerId;
    setIsCharacterNameReadOnly(characterNameReadonlyCondition);
  }, [isGetCharacterDataFromExternalSourceLoading, createCharacterData?.realmServerId]);

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <SelectWrapper
          label="Realm-Server"
          options={realmServerOptions}
          readOnly={isRealmServerReadOnly}
          value={createCharacterData?.realmServerId || ''}
          onChangeHandler={realmServerChangeHandler}
        />
        <TextFieldWrapper
          label="Duration"
          type="number"
          value={spec.gearScore}
          onChangeHandler={(event) => specializationGearScoreHandler(index, event)}
        />
        <SelectWrapper
          label="Faction"
          options={[
            { value: 'Alliance', label: 'Alliance' },
            { value: 'Horde', label: 'Horde' },
          ]}
          readOnly={true}
          value={createCharacterData?.faction || ''}
          onChangeHandler={factionChangeHandler}
        />
        <SelectWrapper
          label="Class"
          options={mapClassesToDropDown()}
          readOnly={true}
          value={createCharacterData?.class || ''}
          onChangeHandler={classChangeHandler}
        />
        <List>
          {createCharacterData.specializations.map((spec, index) => (
            <ListItem key={index}>
              <SelectWrapper
                label="Specialization Name"
                value={spec.name}
                onChangeHandler={(event) => specializationNameHandler(index, event)}
                options={specializationOptions}
              />
              <TextFieldWrapper
                label="Specialization Gear Score"
                type="number"
                value={spec.gearScore}
                onChangeHandler={(event) => specializationGearScoreHandler(index, event)}
              />
              <ButtonWrapper
                onClick={() => handleRemoveSpecialization(index)}
                color="error"
                variant="outlined">
                Remove
              </ButtonWrapper>
            </ListItem>
          ))}
          <ButtonWrapper
            onClick={handleAddSpecialization}
            disabled={createCharacterData.specializations.length >= general.MAX_SPECIALIZATIONS}>
            Add Specialization
          </ButtonWrapper>
        </List>
        <SelectWrapper
          label="Preferred Instances"
          value={createCharacterData.charactersPreferredInstances}
          onChangeHandler={preferredInstancesHandler}
          multiple
          options={instancesOptions}
        />
        <SelectWrapper
          label="Saved Instances"
          value={createCharacterData.charactersSavedInstances}
          onChangeHandler={savedInstancesHandler}
          multiple
          options={instancesOptions}
        />
      </Stack>
      <ButtonWrapper
        onClick={handleCreateCharacter}
        variant="outlined">
        Create
      </ButtonWrapper>
      <ButtonWrapper
        onClick={handleCreateCharacter}
        color="error"
        variant="outlined">
        Delete
      </ButtonWrapper>
    </Container>
  );
};

export default RaidSessionDetails;
