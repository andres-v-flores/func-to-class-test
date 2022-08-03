const defaultState = {
    inputChange: "",
};

const inputReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return { inputChange: action.payload.text };
        case "INPUT_EDIT":
            return { inputChange: action.payload.text };
        case "CLEAR_INPUT":
            return { inputChange: "" };
        case "CLEAR_EDIT":
            return defaultState;
        default:
            return state;
    }
};

export default inputReducer;
