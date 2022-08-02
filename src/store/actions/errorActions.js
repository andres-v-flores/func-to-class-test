const newError = (message) => {
    return {
        type: "NEW_ERROR",
        payload: { text: message },
    };
};

const clearError = () => {
    return {
        type: "CLEAR_ERROR",
    };
};

export { newError, clearError };
