import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitFormHandler = this.submitFormHandler.bind(this);
    }

    inputChangeHandler(e) {
        this.props.setInputChange(e.target.value);
    }

    submitFormHandler(e) {
        e.preventDefault();
        if (!this.props.isEdit) {
            if (this.props.inputChange.trim().length === 0) {
                console.log("need to do form");
                return;
            }
            this.props.onSubmitForm({ task: this.props.inputChange.trim() });
            this.props.setInputChange("");
        } else {
            console.log("finished editing");
            this.props.onDoneEdit(this.props.currEditId, {
                task: this.props.inputChange.trim(),
            });
        }
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
        );
    }
}

export default ToDoForm;
