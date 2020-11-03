import { GENERATION_TYPES } from '../actions/types'
import fetchStates from "./fetchStates" 

const DEFAULT_GENERATION = {generationId: '', expiration: ''};

const generation = (state = DEFAULT_GENERATION, action) =>{
  switch(action.type){
      case GENERATION_TYPES.FETCH: 
         return {...state, status: fetchStates.fetching};
      case GENERATION_TYPES.FETCH_ERROR:
          return {...state, status: fetchStates.error, message:action.message}; 
      case GENERATION_TYPES.FETCH_SUCCESS:
          return {...state, status: fetchStates.success, ...action.generation};      
      default:
          return state; 
  }
}

export default generation;