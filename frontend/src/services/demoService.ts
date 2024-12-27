import { dtoToDemo } from '@/mappers/demoMapper';
import { fetcher } from '../utils/_fetcher';
import { PokemonApiDto } from '../dto/pokemonDto';
import { Pokemon } from '@/domain/pokemon';

interface pokemonProps {
  page: number;
  limit: number;
}

const fetchPokemonsUrlBuilder = (page: number, limit: number) => {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page}`;
};

export const FetchPokemons = async (props: pokemonProps): Promise<Pokemon> => {
  const value = await fetcher.call(fetchPokemonsUrlBuilder(props.page, props.limit), {
    method: 'GET',
  });
  if (!value.ok) {
    const errorResponse = await value.json();
    console.error('Error fetching pokemon:', errorResponse);
    throw new Error(errorResponse.message || 'Failed to fetch pokemon');
  }
  const pokemonApiDto: PokemonApiDto = await value.json();
  return dtoToDemo(pokemonApiDto);
};
