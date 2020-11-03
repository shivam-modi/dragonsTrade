import { GENERATION_TYPES } from './types'
import { BACKEND } from '../config'

export const fetchGeneration = () => dispatch =>{
  dispatch({type: GENERATION_TYPES.FETCH})
  return fetch(`${BACKEND.ADDRESS}generation`)
            .then(response => response.json())
            .then(json => {
               if(json.type === 'error'){
                 dispatch({
                   type: GENERATION_TYPES.FETCH_ERROR,
                   message: json.message
                 });
               }else{
                  dispatch({
                    type: GENERATION_TYPES.FETCH_SUCCESS,
                    generation: json.generation 
                  })
               }
            })
            .catch(error => dispatch({
              type: GENERATION_TYPES.FETCH_ERROR,
              message: error.message
            }));
};  