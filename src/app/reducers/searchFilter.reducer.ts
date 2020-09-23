import {
  SearchFilterAction,
  SearchFilterActionTypes,
} from './../actions/searchFilter.actions';

const initialState: string = '';

export function searchFilterReducer(
  state: string = initialState,
  action: SearchFilterAction
) {
  switch (action.type) {
    case SearchFilterActionTypes.CHANGE_FILTER:
      return action.payload;
    default:
      return state;
  }
}
