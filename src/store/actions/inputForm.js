const changeInput = (message) => {
    return {
        type: "INPUT_CHANGE",
        payload: { text: message },
    };
};

const clearInput = () => {
    return {
        type: "CLEAR_INPUT",
    };
};

export { changeInput, clearInput };
