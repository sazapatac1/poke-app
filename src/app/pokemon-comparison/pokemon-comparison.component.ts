import { ModalService } from './../services/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

//redux
import { Store } from '@ngrx/store';
import {
  ComparisonInfoAppState,
  PokemonAppState,
} from '../reducers/app.reducers';
import { ChangeToFalseAction } from './../actions/comparisonInfo.actions';

@Component({
  selector: 'app-pokemon-comparison',
  templateUrl: './pokemon-comparison.component.html',
  styleUrls: ['./pokemon-comparison.component.css'],
})
export class PokemonComparisonComponent implements OnInit {
  pokemonId: number; //secondPokemonId
  firstPokemonId: number;
  firstPokemon: Pokemon;
  secondPokemon: Pokemon;

  constructor(
    private pokemonStore: Store<PokemonAppState>,
    private comparisonInfoStore: Store<ComparisonInfoAppState>,
    private modalService: ModalService
  ) {
    this.comparisonInfoStore.select('comparisonInfo').subscribe((state) => {
      this.firstPokemonId = state.lastPokemonSelectedId;
    });
  }

  findPokemonsToCompare() {
    this.pokemonStore.select('pokemons').subscribe((state) => {
      for (let pokemon of state) {
        if (this.firstPokemonId === pokemon.id) {
          this.firstPokemon = pokemon;
        }
        if (this.pokemonId === pokemon.id) {
          this.secondPokemon = pokemon;
        }
      }
      this.comparisonInfoStore.dispatch(new ChangeToFalseAction());
    });
  }

  ngOnInit(): void {
    this.findPokemonsToCompare();
  }
}
