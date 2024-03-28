import * as counter from './constants';

export const addProduct = (value) => {
    return {
        type: counter.ADDPRODUCT,
        payload: value
    }
}

export const minQty = (value) => {
    return {
        type: counter.MINQTY,
        payload: value
    }
}