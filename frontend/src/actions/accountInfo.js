import { fetchFromAccount } from './account'
import { ACCOUNT_INFO_TYPES } from './types'

export const fetchAccountInfo = () => fetchFromAccount({
    endpoint: 'info',
    options: { credentials: 'include'},
    FETCH_TYPE: ACCOUNT_INFO_TYPES.FETCH,
    ERROR_TYPE: ACCOUNT_INFO_TYPES.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_INFO_TYPES.FETCH_SUCCESS
});