import {LOAD_MOVIES, SORT_MOVIES} from '../types';

const initialState = {
  movies: [],
  sortingType: '',
}

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_MOVIES:
      return {...state, movies: action.payload}

    case SORT_MOVIES:
      return {...state, sortingType: action.payload}

    default:
      return state
  }
}