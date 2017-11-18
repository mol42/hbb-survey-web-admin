import {
  FETCH_SUMMARY,
  FETCH_SUMMARY_SUCCESS,
  FETCH_SUMMARY_ERROR,
} from '../constants';

export function fetchSummary() {
  return {
      type: FETCH_SUMMARY
  };
}

export function fetchSummarySuccess(summary) {
  return {
    type : FETCH_SUMMARY_SUCCESS,
    summary
  }
}