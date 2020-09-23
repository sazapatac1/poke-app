import { ComparisonInfo } from './../models/comparisonInfo.model';
import { Pokemon } from '../models/pokemon.model';

export interface PokemonAppState {
  readonly pokemons: Array<Pokemon>;
}

export interface ComparisonInfoAppState {
  readonly comparisonInfo: ComparisonInfo;
}

export interface searchFilterAppState {
  readonly searchFilter: string;
}
