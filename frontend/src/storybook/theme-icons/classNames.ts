/**
 * @deprecated use twMerge - from tailwind-merge
 * OBS: it already reexports twMerge
 */
import { twMerge } from 'tailwind-merge';

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export const classNames = twMerge;
