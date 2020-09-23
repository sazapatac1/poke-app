import { ComparisonInfo } from '../models/comparisonInfo.model';
import {
  ComparisonInfoAction,
  ComparisonInfoActionTypes,
} from '../actions/comparisonInfo.actions';

const initialState: ComparisonInfo = {
  lastPokemonSelectedId: 0,
  isComparing: false,
};

export function comparisonInfoReducer(
  state: ComparisonInfo = initialState,
  action: ComparisonInfoAction
) {
  switch (action.type) {
    case ComparisonInfoActionTypes.CHANGE_TRUE:
      return action.payload;
    case ComparisonInfoActionTypes.CHANGE_FALSE:
      return initialState;
    default:
      return state;
  }
}
