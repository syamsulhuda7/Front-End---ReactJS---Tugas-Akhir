import * as auth from "./constants";

const initialState = JSON.parse(localStorage.getItem('account')) || {
    account: []
}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case auth.ADDACCOUNT: {
            const data = action.payload;
                const newData = {
                    id: data.id,
                    email: data.email,
                    token: data.token,
                    role: data.role,
                };
                const newState = { account: newData };
                localStorage.setItem('account', JSON.stringify(newState));
                return newState;
        }
        default:
            return state;
    }
};

export default accountReducer;