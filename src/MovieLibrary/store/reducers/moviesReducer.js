import {LOAD_MOVIES, SORT_MOVIES} from '../../../actionTypes'

const initialState = {
  
}

export default function (state = initialState, action) {
  switch (action.type) {

    case LOAD_MOVIES:
      return {...state, movies: action.payload}

    case SORT_MOVIES:
      return {...state, movies: action.payload}

    default:
      return state
  }
}
