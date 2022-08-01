const defaultState = {
    err: null,
};

const errorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "NEW_ERROR":
            return { err: action.payload.err };
        case "CLEAR_ERROR":
            return defaultState;
        default:
            return state;
    }
};

export default errorReducer;
