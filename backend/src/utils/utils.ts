type RoleHierarchy = {
  [key: string]: number;
};

class Utils {
  roleHierarchy: RoleHierarchy = {
    'Guild Master': 7,
    'Raid Leader': 6,
    Assistant: 5,
    Grandmaster: 4,
    Core: 3,
    Raider: 2,
    Member: 1,
  };

  getFactions(roles: string[]) {
    const factions: string[] = [];
    for (const role of roles) {
      if (role === 'Alliance' || role === 'Horde') {
        factions.push(role);
      }
    }
    return factions;
  }

  concatFactions(factions: string[]) {
    if (factions.length == 2) {
      return factions[0] + ' & ' + factions[1];
    } else return factions[0];
  }

  getHighestRank(roles: string[]) {
    let highestRole = 'Member';
    roles.forEach((role) => {
      if (
        this.roleHierarchy[role] !== undefined &&
        this.roleHierarchy[role] > this.roleHierarchy[highestRole]
      ) {
        highestRole = role;
      }
    });
    return highestRole;
  }
}

export const utils = new Utils();
