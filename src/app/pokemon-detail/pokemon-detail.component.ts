import { ModalService } from './../services/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

//redux
import {
  PokemonAppState,
  ComparisonInfoAppState,
} from '../reducers/app.reducers';
import { Store } from '@ngrx/store';
import { ChangeToTrueAction } from '../actions/comparisonInfo.actions';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonId; //initialized by pokemon component
  pokemon; //details

  constructor(
    private pokemonStore: Store<PokemonAppState>,
    private comparisonInfoStore: Store<ComparisonInfoAppState>,
    private modalService: ModalService
  ) {}

  getPokemonFromList(pokemons: Pokemon[]) {
    this.pokemon = pokemons.find((pokemon) => {
      return pokemon.id === this.pokemonId;
    });
  }

  ngOnInit(): void {
    // get pokemon details
    this.pokemonStore.select('pokemons').subscribe((pokemons) => {
      this.getPokemonFromList(pokemons);
    });
  }

  compareClickHandler() {
    this.comparisonInfoStore.dispatch(
      new ChangeToTrueAction({
        lastPokemonSelectedId: this.pokemonId,
        isComparing: true,
      })
    );
    this.modalService.closeModal(); // close modal
  }
}
