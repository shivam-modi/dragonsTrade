import { DRAGON_TYPES } from "../actions/types"
import fetchStates from "./fetchStates"

const DEFAULT_DRAGON = {
    dragonId: "",
    generationId: "",
    nickname: "",
    birthdate: "",
    traits: []
};

const dragon = (state = DEFAULT_DRAGON ,action) =>{
    switch(action.type){
      case DRAGON_TYPES.FETCH:
          return {...state, status: fetchStates.fetching}
      case DRAGON_TYPES.FETCH_ERROR:
          return {...state, status: fetchStates.error, message: action.message}
      case DRAGON_TYPES.FETCH_SUCCESS:
          return {...state, status: fetchStates.success, ...action.dragon}          
      default: 
          return state;
    }
}

export default dragon