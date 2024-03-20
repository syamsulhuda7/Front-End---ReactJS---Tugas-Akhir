import * as counter from './constants';

export const increment = (value) => {
    return {
        type: counter.INC,
        value: value
    }
}

export const decrement = (value) => {
    return {
        type: counter.DEC,
        value: value
    }
}

export const decrementWithCheckingAction = (value) => {
    return (dispatch, getState) => {
        if (getState().counter.count > 1) {
            dispatch(decrement(value))
        }
    }
}