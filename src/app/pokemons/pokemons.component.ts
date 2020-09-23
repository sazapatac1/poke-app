import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit, Input } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import { searchFilterAppState } from '../reducers/app.reducers';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemonsMetaData;
  pokemons = [];
  searchFilter: string;

  constructor(
    private httpService: HttpService,
    private searchFilterStore: Store<searchFilterAppState>
  ) {}

  ngOnInit(): void {
    this.httpService.getAll().subscribe((response) => {
      this.pokemonsMetaData = response;
      this.pokemons = this.pokemonsMetaData.results;
    });

    this.searchFilterStore.select('searchFilter').subscribe((state) => {
      this.searchFilter = state;
    });
  }

  loadMorePokemons() {
    this.httpService
      .getAll(this.pokemonsMetaData.next)
      .subscribe((response) => {
        this.pokemonsMetaData = response;
        this.pokemons.push(...this.pokemonsMetaData.results);
      });
  }

  // add pokemons while scrolling
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    const scrollPosition =
      window.innerHeight + event.target.scrollingElement.scrollTop;
    const scrollHeight = event.target.scrollingElement.scrollHeight;
    if (scrollPosition === scrollHeight) {
      this.loadMorePokemons();
    }
  }
}
