
import { Button, } from 'react-bootstrap';

function DisplayToDo(props) {

  const onEditHandler = () => {
    console.log('editing')
    props.onEditTask(props.id, props.toDo)
  }

  const onDeleteHandler = () =>  {
      props.onDelete(props.id);
  }
  return(
    <div className='d-flex mb-2'>
      <li className={props.className + ' w-75 mr-3'}>{props.toDo} </li> 
      <Button onClick={onEditHandler}>EDIT</Button>
      <Button onClick={onDeleteHandler} variant='warning' >DEL</Button>
    </div>
  )
}

export default DisplayToDo;