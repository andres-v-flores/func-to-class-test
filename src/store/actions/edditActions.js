const inputEdit = (message, taskId) => {
    return {
        type: "INPUT_EDIT",
        payload: { tasked: taskId, text: message },
    };
};

const clearEdit = () => {
    return {
        type: "CLEAR_EDIT",
    };
};

export { inputEdit, clearEdit };
