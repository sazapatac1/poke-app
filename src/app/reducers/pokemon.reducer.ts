import { PokemonAction, PokemonActionTypes } from '../actions/pokemon.actions';
import { Pokemon } from '../models/pokemon.model';

const initialState: Array<Pokemon> = [];

export function pokemonReducer(
  state: Array<Pokemon> = initialState,
  action: PokemonAction
) {
  switch (action.type) {
    case PokemonActionTypes.ADD_POKEMON:
      return [...state, action.payload];
    default:
      return state;
  }
}
