import {ACCOUNT_DRAGONS_TYPES} from "./types"
import { fetchFromAccount } from "./account"

export const fetchAccountDragons = () => fetchFromAccount({
    endpoint: 'dragons',
    options: {credentials: 'include'},
    FETCH_TYPE: ACCOUNT_DRAGONS_TYPES.FETCH,
    ERROR_TYPE: ACCOUNT_DRAGONS_TYPES.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_DRAGONS_TYPES.FETCH_SUCCESS
});

