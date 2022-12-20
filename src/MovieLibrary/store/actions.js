import {LOAD_MOVIES, SORT_MOVIES} from '../../actionTypes';

export function fetchTopRatedMovies(payload) {
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