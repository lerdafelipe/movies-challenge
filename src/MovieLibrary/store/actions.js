import {LOAD_MOVIES, SORT_MOVIES} from './types';

export function fetchMovies(payload) {
  return {
    type: LOAD_MOVIES,
    payload
  }
}

export function sortMovies(payload) {
  return {
    type: SORT_MOVIES,
    payload
  }
}