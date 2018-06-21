export const RECIVE_ENTRY = 'RECIVE_ENTRY'
export const ADD_ENTRY = 'ADD_ENTRY'


export function addEntry (entry) {
  return{
    type: ADD_ENTRY,
    entry
  }
}

export function reciveEntry(entries) {
  return {
    type: RECIVE_ENTRY,
    entries
  }
}