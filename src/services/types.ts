import type { Nullable, Numerishi } from '../types';

export interface DefaultParams {
  limit?: Numerishi;
  offset?: Numerishi;
}

export interface Pokemon {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: PokemonForm[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: PokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types: any;
  species: PokemonForm;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonType[];
  weight: number;
}

export interface WithPaginate<T> {
  count: number;
  next: string;
  previous: Nullable<string>;
  results: T;
}

export interface PokemonAbilityEffect {
  effect: string;
  language: PokemonForm;
  short_effect: string;
}

export interface PokemonAbilityFull {
  effect_changes: unknown[];
  effect_entries: PokemonAbilityEffect[];
  flavor_text_entries: { flavor_text: string; language: PokemonForm; version_group: PokemonForm }[];
  generation: PokemonForm<PokemonGenerationType>;
  id: number;
  is_main_series: boolean;
  name: string;
  names: { language: PokemonForm; name: string }[];
  pokemon: { is_hidden: boolean; pokemon: PokemonForm; slot: number }[];
}

export interface PokemonAbility {
  ability: PokemonForm;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonForm<T extends string = string> {
  name: T;
  url: string;
}

export interface PokemonGameIndex {
  game_index: number;
  version: PokemonForm;
}

export interface PokemonVersionDetails {
  rarity: number;
  version: PokemonForm;
}

export interface PokemonHeldItem {
  item: PokemonForm;
  version_details: PokemonVersionDetails;
}

export interface PokemonMove {
  move: PokemonForm;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: PokemonForm;
    version_group: PokemonForm;
  }[];
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: PokemonForm;
}

export type PokemonTypes =
  | 'grass'
  | 'poison'
  | 'water'
  | 'fire'
  | 'electric'
  | 'ground'
  | 'fairy'
  | 'normal'
  | 'flying'
  | 'default';

export interface PokemonType {
  slot: number;
  type: PokemonForm<PokemonTypes>;
}

export type PokemonGenerationType =
  | 'generation-i'
  | 'generation-ii'
  | 'generation-iii'
  | 'generation-iv'
  | 'generation-v'
  | 'generation-vi'
  | 'generation-vii'
  | 'generation-viii';

export interface PokemonGeneration {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface PokemonSprites {
  back_default: string;
  back_female: Nullable<string>;
  back_shiny: Nullable<string>;
  back_shiny_female: Nullable<string>;
  front_default: Nullable<string>;
  front_female: Nullable<string>;
  front_shiny: Nullable<string>;
  front_shiny_female: Nullable<string>;
  other: {
    dream_world: {
      front_default: string;
      front_female: Nullable<string>;
    };
    home: {
      front_default: string;
      front_female: Nullable<string>;
      front_shiny: Nullable<string>;
      front_shiny_female: Nullable<string>;
    };
    'official-artwork': {
      front_default: string;
    };
  };
  versions: Record<PokemonGenerationType, PokemonGeneration>;
}
