import { HTTPClient } from './client';
import type {
  Pokemon,
  PokemonForm,
  WithPaginate,
  DefaultParams,
  PokemonAbilityFull,
} from './types';

export default {
  get(query: string) {
    return HTTPClient.get<Pokemon>(`/pokemon/${query}`);
  },

  getList(params: DefaultParams) {
    return HTTPClient.get<WithPaginate<PokemonForm[]>>('/pokemon', {
      params,
    });
  },

  getAbility(name: string) {
    return HTTPClient.get<PokemonAbilityFull>(`/ability/${name}`);
  },
};
