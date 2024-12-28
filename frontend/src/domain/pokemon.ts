export type PokemonDetails = {
  name: string;
  url: string;
};

export type Pokemon = {
  count: number;
  hasMore: boolean;
  results: PokemonDetails[];
};
