export const getClassSpecializations = (className: string) => {
  const wowClass = wowClassesAndSpecs.find((cls) => cls.name === className);
  return wowClass ? wowClass.specializations : [];
};

export const getAllClasses = () => {
  return wowClassesAndSpecs.map((cls) => cls.name);
};

const wowClassesAndSpecs = [
  {
    name: 'Death Knight',
    specializations: ['Blood (dps)', 'Blood (tank)', 'Frost (dps)', 'Frost (tank)', 'Unholy (dps)', 'Unholy (tank)'],
  },
  {
    name: 'Druid',
    specializations: ['Balance', 'Feral (dps)', 'Feral (tank)', 'Restoration (druid)'],
  },
  {
    name: 'Hunter',
    specializations: ['Beast Mastery', 'Marksmanship', 'Survival'],
  },
  {
    name: 'Mage',
    specializations: ['Arcane', 'Fire', 'Frost'],
  },
  {
    name: 'Paladin',
    specializations: ['Holy (paladin)', 'Protection (paladin)', 'Retribution'],
  },
  {
    name: 'Priest',
    specializations: ['Discipline', 'Holy (priest)', 'Shadow'],
  },
  {
    name: 'Rogue',
    specializations: ['Assassination', 'Combat', 'Subtlety'],
  },
  {
    name: 'Shaman',
    specializations: ['Elemental', 'Enhancement', 'Spellhance', 'Restoration (shaman)'],
  },
  {
    name: 'Warlock',
    specializations: ['Affliction', 'Demonology', 'Destruction'],
  },
  {
    name: 'Warrior',
    specializations: ['Arms', 'Fury', 'Protection (warrior)'],
  },
];
