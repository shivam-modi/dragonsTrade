import {ACCOUNT_DRAGONS_TYPES} from "../actions/types"
import fetchStates from './fetchStates'

const DEFAULT_ACCOUNT_DRAGONS = { dragons: []};

const accountDragons = (state = DEFAULT_ACCOUNT_DRAGONS, action) => {
    switch(action.type){
       case ACCOUNT_DRAGONS_TYPES.FETCH:
            return {...state, status: fetchStates.fetching};
       case ACCOUNT_DRAGONS_TYPES.FETCH_ERROR: 
            return {...state, status: fetchStates.error, message: action.message};
       case ACCOUNT_DRAGONS_TYPES.FETCH_SUCCESS:
            return {...state, status: fetchStates.success, dragons: action.dragons, message: action.message};          
       default: 
            return state;    
   }
}

export default accountDragons;