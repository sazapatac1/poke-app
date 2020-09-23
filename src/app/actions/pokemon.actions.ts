import { Action } from '@ngrx/store';
import { Pokemon } from '../models/pokemon.model';

export enum PokemonActionTypes {
  ADD_POKEMON = '[POKEMON] Add Pokemon',
}

export class AddPokemonAction implements Action {
  readonly type = PokemonActionTypes.ADD_POKEMON;

  constructor(public payload: Pokemon) {}
}

export type PokemonAction = AddPokemonAction;
