import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit, Input } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import { searchFilterAppState } from '../reducers/app.reducers';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent implements OnInit {
  pokemonsMetaData;
  pokemons = [];
  searchFilter: string;
  offset = 0;

  constructor(
    private httpService: HttpService,
    private searchFilterStore: Store<searchFilterAppState>
  ) {}

  ngOnInit(): void {
    this.httpService.getAll().subscribe((response) => {
      this.pokemonsMetaData = response;
      this.pokemons = this.addId(this.pokemonsMetaData.results, this.offset);
    });

    this.searchFilterStore.select('searchFilter').subscribe((state) => {
      this.searchFilter = state;
    });
  }

  addId(array: Array<any>, offset: number) {
    this.offset += 20;
    return array.map((value, index) => ({
      ...value,
      id: offset + index + 1,
    }));
  }

  loadMorePokemons() {
    this.httpService
      .getAll(this.pokemonsMetaData.next)
      .subscribe((response) => {
        this.pokemonsMetaData = response;
        this.pokemons.push(
          ...this.addId(this.pokemonsMetaData.results, this.offset)
        );
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
