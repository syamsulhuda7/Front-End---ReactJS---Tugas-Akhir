import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import counterReducer from "./Counter/reducer";
import { thunk } from "redux-thunk";

let rootReducers = combineReducers({
    counter : counterReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;