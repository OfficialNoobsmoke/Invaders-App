export type PokemonDetailsDto = {
  name: string;
  url: string;
};

export type PokemonApiDto = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDetailsDto[];
};