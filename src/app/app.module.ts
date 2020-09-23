import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

//services
import { HttpService } from './services/http/http.service';
import { PokemonService } from './services/pokemon/pokemon.service';
import { ModalService } from './services/modal/modal.service';
import { AppErrorHandler } from './common/app-error-handler';

//ngrx
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './reducers/pokemon.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { comparisonInfoReducer } from './reducers/comparisonInfo.reducer';
import { searchFilterReducer } from './reducers/searchFilter.reducer';

//components
import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatsComponent } from './stats/stats.component';
import { HomeComponent } from './home/home.component';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

//charts
import { ChartsModule } from 'ng2-charts';
import { PokemonComparisonComponent } from './pokemon-comparison/pokemon-comparison.component';

//routes
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemons', component: PokemonsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonComponent,
    PokemonDetailComponent,
    NavbarComponent,
    StatsComponent,
    PokemonComparisonComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      pokemons: pokemonReducer,
      comparisonInfo: comparisonInfoReducer,
      searchFilter: searchFilterReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ModalModule.forRoot(),
    Ng2SearchPipeModule,
    FormsModule,
    ChartsModule,
  ],
  exports: [RouterModule],
  providers: [
    HttpService,
    PokemonService,
    ModalService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
