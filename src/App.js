import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DisplayToDo from "./components/DisplayToDo";
import ToDoForm from "./components/ToDoForm";
import { connect } from "react-redux";
import { newError, clearEdit, clearInput } from "./store/actions";
const URL =
    "https://react-http-398cc-default-rtdb.asia-southeast1.firebasedatabase.app/task";

class App extends Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            toDo: [], // todo state will remain for now in the appClass section
        };
        // this.fetchButtonHandler = this.fetchButtonHandler.bind(this);
        this.fetchTask = this.fetchTask.bind(this);
        this.submitToDataBase = this.submitToDataBase.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.saveEditTask = this.saveEditTask.bind(this);
    }
    // fetchButtonHandler() {
    //     this.fetchTask();
    // }

    async fetchTask() {
        async function fetchGet() {
            const response = await fetch(URL + ".json");
            if (!response.ok) {
                throw new Error(
                    "Something went wrong with getting data from DB"
                );
            }
            const data = await response.json();
            return data;
        }
        try {
            let data = await fetchGet();
            let taskArr = [];
            for (const key in data) {
                taskArr.push({
                    id: key,
                    task: data[key].task,
                });
            }
            this.setState({ toDo: taskArr });
            // console.log(data);
            // console.log('fetch success');
        } catch (e) {
            this.props.newError(e.message);
        }
    }
    async submitToDataBase(obj) {
        async function fetchPost(obj) {
            const response = await fetch(URL + ".json", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Something went wrong in posting to DB");
            }
            const data = await response.json();
            return data;
        }

        try {
            const data = await fetchPost(obj);
            this.setState((prev) => {
                return { toDo: [...prev.toDo, { ...obj, id: data.name }] };
            });
            this.props.clearInput();
            // console.log(data);
        } catch (e) {
            this.props.newError(e.message);
        }
    }
    async deleteTask(taskId) {
        // console.log(taskId);
        // console.log(this.state.toDo);
        async function fetchDel() {
            const response = await fetch(URL + "/" + taskId + ".json", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Something went wrong when deleting from DB");
            }
            // console.log(response);
            return null;
        }
        try {
            await fetchDel();
            this.setState((prev) => {
                return { toDo: prev.toDo.filter((obj) => obj.id !== taskId) };
            });
        } catch (e) {
            this.props.newError(e.message);
        }
    }
    async saveEditTask(taskId, obj) {
        let newTaskObj = obj;
        async function fetchPut() {
            const response = await fetch(URL + "/" + taskId + ".json", {
                method: "PUT",
                body: JSON.stringify(newTaskObj),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Somehting went wrong on editing");
            }
            const data = await response.json();
            return data;
        }

        try {
            // console.log("trying to do put");
            let data = await fetchPut(); // class crashes here IDK why
            // double checked it but no spelling errors
            // will just crash
            // other functionalities work just fine
            console.log(data);
            let arrIndex = this.state.toDo.findIndex(
                (obj) => obj.id === taskId
            );
            this.setState((prev) => {
                prev.toDo[arrIndex] = { ...newTaskObj, id: taskId };
                return {
                    toDo: prev.toDo,
                };
            });
            this.props.clearEdit();
        } catch (e) {
            this.props.newError(e.message);
        }
    }

    componentDidMount() {
        this.fetchTask();
    }

    render() {
        let toDoArr = this.state.toDo.map((toDoItem) => {
            return (
                <DisplayToDo
                    className={"list-group-item "}
                    key={toDoItem.id}
                    id={toDoItem.id}
                    toDo={toDoItem.task}
                    onDelete={this.deleteTask}
                    focusRef={this.inputRef}
                />
            );
        });

        return (
            <div className="App">
                <header className="App-header">
                    <ToDoForm
                        focusRef={this.inputRef}
                        onSubmitForm={this.submitToDataBase}
                        onDoneEdit={this.saveEditTask}
                    />
                    <div className="w-50">
                        {/* {<Button onClick={this.fetchButtonHandler}>
                            Fetch Task
                        </Button>} */}
                        <ul className="list-group red">{toDoArr}</ul>
                    </div>
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputChange: state.inputState.inputChange,
        isEdit: state.edditState.isEdit,
        err: state.errorState.err,
        tasked: state.edditState.tasked,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearInput: () => {
            dispatch(clearInput());
        },
        newError: (message) => {
            dispatch(newError(message));
        },
        clearEdit: () => {
            dispatch(clearEdit());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
