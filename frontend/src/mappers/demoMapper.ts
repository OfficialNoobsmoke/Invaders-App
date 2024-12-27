import { Pokemon, PokemonDetails } from '@/domain/pokemon';
import { PokemonApiDto, PokemonDetailsDto } from '../dto/pokemonDto';

const dtoToDemoDetails = (demo: PokemonDetailsDto): PokemonDetails => {
  return {
    name: demo.name,
    url: demo.url,
  };
};

export const dtoToDemo = (demo: PokemonApiDto): Pokemon => {
  return {
    count: demo.count,
    hasMore: !demo.next,
    results: demo.results.map(dtoToDemoDetails),
  };
};
