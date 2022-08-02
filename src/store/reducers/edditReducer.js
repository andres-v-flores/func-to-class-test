const defaultState = {
    tasked: "",
    isEdit: false,
};

const edditReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "INPUT_EDIT":
            return { isEdit: true, tasked: action.payload.tasked };
        case "CLEAR_EDIT":
            return { isEdit: false, tasked: "" };
        default:
            return state;
    }
};

export default edditReducer;
