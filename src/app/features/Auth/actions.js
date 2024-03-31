import * as auth from './constants';

export const addAccount = (value) => {
    return {
        type: auth.ADDACCOUNT,
        payload: value
    }
}