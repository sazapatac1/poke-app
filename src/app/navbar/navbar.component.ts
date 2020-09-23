import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//redux
import { Store } from '@ngrx/store';
import { ChangeToFalseAction } from '../actions/comparisonInfo.actions';
import {
  ComparisonInfoAppState,
  searchFilterAppState,
} from '../reducers/app.reducers';
import { ChangeFilterAction } from './../actions/searchFilter.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'PokéApp';
  isComparing: boolean;

  constructor(
    private comparisonInfoStore: Store<ComparisonInfoAppState>,
    private searchFilterStore: Store<searchFilterAppState>,
    public router: Router
  ) {
    this.comparisonInfoStore
      .select('comparisonInfo')
      .subscribe((comparisonInfoState) => {
        this.isComparing = comparisonInfoState.isComparing;
      });
  }

  ngOnInit(): void {}

  searchTextChange(searchText: string) {
    this.searchFilterStore.dispatch(new ChangeFilterAction(searchText));
  }

  cancelComparison() {
    this.comparisonInfoStore.dispatch(new ChangeToFalseAction());
  }
}
