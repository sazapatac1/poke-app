import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonComparisonComponent } from '../pokemon-comparison/pokemon-comparison.component';
//models
import { Pokemon } from '../models/pokemon.model';
import { ComparisonInfo } from './../models/comparisonInfo.model';
//services
import { PokemonService } from '../services/pokemon/pokemon.service';
import { HttpService } from '../services/http/http.service';
import { ModalService } from './../services/modal/modal.service';
//redux
import { Store } from '@ngrx/store';
import { PokemonAppState } from '../reducers/app.reducers';
import { ComparisonInfoAppState } from './../reducers/app.reducers';
import { AddPokemonAction } from '../actions/pokemon.actions';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  @Input('pokemon') pokemon;
  pokemonImgUrl: string;
  pokemons: Pokemon[];
  comparisonInfo: ComparisonInfo;

  constructor(
    private httpService: HttpService,
    private pokemonStore: Store<PokemonAppState>,
    private comparisonInfoStore: Store<ComparisonInfoAppState>,
    private pokemonService: PokemonService,
    private modalService: ModalService
  ) {
    this.pokemonStore.select('pokemons').subscribe((pokemons) => {
      this.pokemons = pokemons;
    });

    this.comparisonInfoStore.select('comparisonInfo').subscribe((state) => {
      this.comparisonInfo = state;
    });
  }

  ngOnInit(): void {
    // add image url to pokemon
    this.pokemonImgUrl = this.pokemonService.addImgUrl(this.pokemon.id);
  }

  storePokemon() {
    if (!this.pokemonService.isStored(this.pokemon.id, this.pokemons)) {
      this.httpService.getById(this.pokemon.id).subscribe((response) => {
        this.pokemonStore.dispatch(
          new AddPokemonAction({
            id: this.pokemon.id,
            imgUrl: this.pokemonImgUrl,
            details: response,
          })
        );
      });
    }
  }

  onClick() {
    this.storePokemon();
    if (this.comparisonInfo.isComparing) {
      this.modalService.openModal(PokemonComparisonComponent, this.pokemon.id);
    } else {
      this.modalService.openModal(PokemonDetailComponent, this.pokemon.id);
    }
  }
}
