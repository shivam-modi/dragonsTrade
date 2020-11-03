import { DRAGON_TYPES } from "./types"
import {BACKEND} from "../config"

export const fetchDragon = () => dispatch =>{
    dispatch({type: DRAGON_TYPES.FETCH});

    return fetch(`${BACKEND.ADDRESS}dragon/new`, {
      credentials: 'include' 
    }).then(response => response.json())
        .then(json => {
            console.log(json);
            if(json.type === 'error'){
                dispatch({type: DRAGON_TYPES.FETCH_ERROR, message: json.message});
            } else{
                dispatch({type: DRAGON_TYPES.FETCH_SUCCESS, dragon: json.dragon});
            }
        })
        .catch(err => dispatch({type: DRAGON_TYPES.FETCH_ERROR, message: err.message}));
}