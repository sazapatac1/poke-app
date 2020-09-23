import { ComparisonInfo } from './../models/comparisonInfo.model';
import { Action } from '@ngrx/store';

export enum ComparisonInfoActionTypes {
  CHANGE_TRUE = '[COMPARISONINFO] CHANGE INFO TO TRUE',
  CHANGE_FALSE = '[COMPARISONINFO] CHANGE INFO TO FALSE',
}

export class ChangeToTrueAction implements Action {
  readonly type = ComparisonInfoActionTypes.CHANGE_TRUE;
  constructor(public payload: ComparisonInfo) {}
}

export class ChangeToFalseAction implements Action {
  readonly type = ComparisonInfoActionTypes.CHANGE_FALSE;
}

export type ComparisonInfoAction = ChangeToTrueAction | ChangeToFalseAction;
