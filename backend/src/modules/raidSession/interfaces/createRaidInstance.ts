import { Faction } from '../../character/interfaces/faction';

export interface CreateRaidInstance {
  instanceId: string;
  description: string;
  faction: Faction;
}
