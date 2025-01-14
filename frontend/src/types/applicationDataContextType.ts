import { DropdownOptions } from '../interfaces/dropDownOptions';

export type ApplicationDataContextType = {
  dropdowns: {
    realmServers: DropdownOptions[];
    instances: DropdownOptions[];
  };
};
