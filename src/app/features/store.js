import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import counterReducer from "./Counter/reducer";
import { thunk } from "redux-thunk";
import accountReducer from "./Auth/reducer";

let rootReducers = combineReducers({
    counter : counterReducer,
    account : accountReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;