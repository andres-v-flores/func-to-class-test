import React, { Component, createRef } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import DisplayToDoClass from "./DisplayToDoClass";
import ToDoFormClass from "./ToDoFormClass";

const URL =
    "https://react-http-398cc-default-rtdb.asia-southeast1.firebasedatabase.app/task";

class AppClass extends Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            toDo: [],
            err: null,
            isEdit: false,
            inputChange: "",
            tasked: "",
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.fetchEditTask = this.fetchEditTask.bind(this);
        this.fetchButtonHandler = this.fetchButtonHandler.bind(this);
        this.fetchTask = this.fetchTask.bind(this);
        this.submitToDataBase = this.submitToDataBase.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.saveEditTask = this.saveEditTask.bind(this);
    }
    inputChangeHandler(task) {
        this.setState({ inputChange: task });
    }
    fetchEditTask(taskId, task) {
        console.log("editing the " + taskId);
        this.setState({
            inputChange: task,
            isEdit: true,
            tasked: taskId,
        });
        this.inputRef.current.focus();
    }

    fetchButtonHandler() {
        this.fetchTask();
    }

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
            this.setState({ err: e.message });
            console.log("something went error");
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
            // console.log(data);
        } catch (e) {
            this.setState({ err: e.message });
            console.log("something went error");
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
            this.setState({ err: e.message });
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
            console.log("trying to do put");
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
                    isEdit: false,
                    tasked: "",
                    inputChange: "",
                };
            });
        } catch (e) {
            console.log("something went wrong");
            console.log(this.state);
            console.log(e.message);
            this.setState({ err: e.message });
        }
    }

    componentDidMount() {
        this.fetchTask();
    }

    render() {
        let toDoArr = this.state.toDo.map((toDoItem) => {
            return (
                <DisplayToDoClass
                    className={"list-group-item "}
                    key={toDoItem.id}
                    id={toDoItem.id}
                    toDo={toDoItem.task}
                    onDelete={this.deleteTask}
                    onEditTask={this.fetchEditTask}
                />
            );
        });

        return (
            <div className="App">
                <header className="App-header">
                    <ToDoFormClass
                        focusRef={this.inputRef}
                        onSubmitForm={this.submitToDataBase}
                        inputChange={this.state.inputChange}
                        setInputChange={this.inputChangeHandler}
                        isEdit={this.state.isEdit}
                        onDoneEdit={this.saveEditTask}
                        currEditId={this.state.tasked}
                    />
                    <div className="w-50">
                        <Button onClick={this.fetchButtonHandler}>
                            Fetch Task
                        </Button>
                        <ul className="list-group red">{toDoArr}</ul>
                    </div>
                </header>
            </div>
        );
    }
}

export default AppClass;
