import { apiRoutes } from '../constants/constants';
import { ExternalCharacterData } from '../dto/externalCharacterData';
import apiClient from '../utils/apiClient';
import interpolate from '../utils/interpolate';

const externalService = {
  getCharacterDataFromExternalSource: async (
    characterName: string,
    realmServerId: string
  ): Promise<ExternalCharacterData> => {
    const result = await apiClient.get<ExternalCharacterData>(
      interpolate(apiRoutes.CHARACTER_EXTERNAL, characterName, realmServerId)
    );

    return result.data;
  },
};

export default externalService;
