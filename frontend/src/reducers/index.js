import { combineReducers } from 'redux';
import generation from './generation';
import dragon from './dragon'
import account from './account'
import accountDragons from './accountDragons'
import accountInfo from './accountInfo';
import publicDragons from './publicDragons'

export default combineReducers({ 
    account, 
    dragon, 
    generation, 
    accountDragons,
    accountInfo,
    publicDragons
});
//     // console.log('generationReducerata', state);
//     // console.log('action', action); 
   
//     if(action.type === GENERATION_ACTION_TYPE){
//       return { generation: action.generation};
//     }
  
//     return {
//      generation : DEFAULT_GENERATION
//    }