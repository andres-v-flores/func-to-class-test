import { createStore, combineReducers } from "redux";
import { edditReducer, errorReducer, inputReducer } from "./redux-container";

const rootReducer = combineReducers({
    edditState: edditReducer,
    errorState: errorReducer,
    inputState: inputReducer,
});

const store = createStore(rootReducer);

export default store;
