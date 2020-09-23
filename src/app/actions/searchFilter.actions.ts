import { Action } from '@ngrx/store';

export enum SearchFilterActionTypes {
  CHANGE_FILTER = '[SEARCHFILTER] Change search filter',
}

export class ChangeFilterAction implements Action {
  readonly type = SearchFilterActionTypes.CHANGE_FILTER;

  constructor(public payload: string) {}
}

export type SearchFilterAction = ChangeFilterAction;
