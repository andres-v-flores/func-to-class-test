
// import { useState } from 'react';
import { Button, Form,  } from 'react-bootstrap';

function ToDoForm(props){
  const {inputChange, setInputChange, isEdit} = props;
  
  const inputChangeHandler = (e) =>{
    setInputChange(e.target.value)
  }



  const submitFormHandler = (e) =>{
    e.preventDefault();

    if (!isEdit) {
      if(inputChange.trim().length === 0){
        console.log('need to do form')
        return
    }
    props.onSubmitForm( {task: inputChange.trim()} );
    setInputChange('')
    } else {
      console.log('finished editing');
      props.onDoneEdit();
    }

    
  }

  const buttonDisplay = isEdit? <Button variant='info' type='submit' >EDIT</Button>: <Button type='submit' >ADD</Button>
  return (
    <Form className='w-50 need-validation' onSubmit={submitFormHandler} noValidate>
      <div className='d-flex w-100 mb-4 red justify-content-between'>
        <Form.Control 
        ref={props.focusRef} 
        id='addtask' 
        className='w-75'  
        onChange={inputChangeHandler} 
        type='text' 
        placeholder="Add a task" 
        value={inputChange} 
        required
        />
        {buttonDisplay}
      </div>
    </Form>
  )
}

export default ToDoForm;