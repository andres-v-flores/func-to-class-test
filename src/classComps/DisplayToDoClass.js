import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class DisplayToDoClass extends Component {
    constructor(props){
        super(props);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
    }
    onEditHandler() {
        console.log('editing');
        this.props.onEditTask(this.props.id, this.props.toDo);
    }
    onDeleteHandler() {
        this.props.onDelete(this.props.id);
    }
    render(){
        return(
            <div className='d-flex mb-2'>
                <li className={this.props.className + ' w-75 mr-3'}>{this.props.toDo}</li>
                <Button onClick={this.onEditHandler}>Edit</Button>
                <Button onClick={this.onDeleteHandler} variant='warning'>DEL</Button>
            </div>
        )
    }
}

export default DisplayToDoClass;