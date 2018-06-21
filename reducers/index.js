import { RECIVE_ENTRY, ADD_ENTRY } from '../actions'

export default function entries(state = {}, action) {
  switch(action.type){
    case RECIVE_ENTRY:
      return {
        ...state,
        ...action.entries
      }
    case ADD_ENTRY: 
      return {
        ...state,
        ...action.entry
      }
    default:
      return state
  } 
}