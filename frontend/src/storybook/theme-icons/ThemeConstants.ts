export type Scheme = 'dark' | 'light';
export type Color = 'primary' | 'danger' | 'success' | 'warning' | 'neutral';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type TailwindColor =
  | 'slate'
  | 'gray'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'zinc';

export const Colors: Color[] = ['primary', 'neutral', 'danger', 'success', 'warning'];
export const NextUiColors: ('default' | 'primary' | 'success' | 'warning' | 'secondary' | 'danger')[] = [
  'default',
  'primary',
  'danger',
  'success',
  'warning',
  'secondary',
];
export const TailwindColors: TailwindColor[] = [
  'slate',
  'gray',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'zinc',
];

export const Sizes: Size[] = ['sm', 'md', 'lg', 'xl'];
