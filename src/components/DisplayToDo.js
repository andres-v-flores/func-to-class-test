import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { inputEdit } from "../store/actions";

class DisplayToDo extends Component {
    constructor(props) {
        super(props);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
    }
    onEditHandler() {
        console.log("editing");
        this.props.onEditTask(this.props.toDo, this.props.id);
        this.props.focusRef.current.focus();
        console.log(this.props.inputChange);
        console.log(this.props.isEdit);
        console.log(this.props.errorMessage);
    }
    onDeleteHandler() {
        this.props.onDelete(this.props.id);
    }
    render() {
        return (
            <div className="d-flex mb-2">
                <li className={this.props.className + " w-75 mr-3"}>
                    {this.props.toDo}
                </li>
                <Button onClick={this.onEditHandler}>Edit</Button>
                <Button onClick={this.onDeleteHandler} variant="warning">
                    DEL
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputChange: state.inputState,
        isEdit: state.edditState,
        errorMessage: state.errorState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEditTask: (message, taskId) => {
            dispatch(inputEdit(message, taskId));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayToDo);

// this needs to be connected to redux
// on app.js will remove the onedittask handler
// just kidding will still need it since i dont have a middlewaer to do async tasks
// future implementations will make it place it here directly after studying middleware and thunks
// since the asycn function only works when saving the edit task we can connect this directly to redux
// this app dont need mapStatetoProps
// this app just need mapDispatchToActions
