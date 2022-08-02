import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { changeInput } from "../store/actions/inputForm";
class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitFormHandler = this.submitFormHandler.bind(this);
        this.testFunc = this.testFunc.bind(this);
    }

    inputChangeHandler(e) {
        this.props.changeInput(e.target.value);
    }

    submitFormHandler(e) {
        e.preventDefault();
        if (!this.props.isEdit) {
            if (this.props.inputChange.trim().length === 0) {
                console.log("need to do form");
                return;
            }
            this.props.onSubmitForm({ task: this.props.inputChange.trim() });
            this.props.changeInput("");
        } else {
            console.log("finished editing");
            this.props.onDoneEdit(this.props.currEditId, {
                task: this.props.inputChange.trim(),
            });
        }
    }

    testFunc() {
        console.log("sending a test");
        this.props.changeInput("sending Test");
        console.log(this.props.inputChange);
        console.log(this.props.changeInput);
    }
    render() {
        let buttonDisplay = this.props.isEdit ? (
            <Button variant="info" type="submit">
                EDIT
            </Button>
        ) : (
            <Button type="submit"> ADD</Button>
        );
        return (
            <>
                <Form
                    className="w-50 need-validation"
                    onSubmit={this.submitFormHandler}
                    noValidate
                >
                    <div className="d-flex w-100 mb-4 red justify-content-between">
                        <Form.Control
                            ref={this.props.focusRef}
                            id="addtask"
                            className="w-75"
                            onChange={this.inputChangeHandler}
                            type="text"
                            placeholder="Add a task"
                            value={this.props.inputChange}
                            required
                        />
                        {buttonDisplay}
                    </div>
                </Form>
                <button onClick={this.testFunc}>test</button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputChange: state.inputState.inputChange,
        isEdit: state.edditState.isEdit,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeInput: function (message) {
            dispatch(changeInput(message));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoForm);
