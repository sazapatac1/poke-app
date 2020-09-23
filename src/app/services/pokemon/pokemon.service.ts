import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  imgBaseUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor() {}

  isStored(id: number, pokemons) {
    for (let pokemon of pokemons) {
      if (pokemon.id === id) return true;
    }
    return false;
  }

  addImgUrl(pokemonId: number) {
    return this.imgBaseUrl + pokemonId + '.png';
  }
}
