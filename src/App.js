import { useState,useCallback, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './App.css';
import DisplayToDo from './DisplayToDo';
import ToDoForm from './ToDoForm';

const URL = 'https://react-http-398cc-default-rtdb.asia-southeast1.firebasedatabase.app/task';


function App() {
  const inputRef = useRef();
  const [toDo, setToDo] = useState([]);
  const [err, setErr] = useState(null);
  const [isEdit, setIsEdit] = useState(false)
  const [inputChange, setInputChange] = useState('');
  const [tasked, setTasked] = useState('');

  const inputChangeHandler = (task) => {
    setInputChange(task)
  }
  const saveEditTask = async() => {
    console.log(tasked + ' edited task ' + inputChange)
    let newTaskObj = {task: inputChange}

    async function fetchPut() {
      const response = await fetch(URL+'/'+tasked+'.json',{
        method: 'PUT',
        body: JSON.stringify(newTaskObj),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok){
        throw new Error('Something went wrong on editing')
      }
      const data = await response.json();
      return data
    }
    try{
      let data = await fetchPut();
      console.log(data);
      let arrIndex = toDo.findIndex(obj => obj.id === tasked)
      setToDo(prev => {
        prev[arrIndex] = {...newTaskObj, id: tasked};
        return prev;
      })
      console.log(toDo[arrIndex].task);
      setIsEdit(false);
      setTasked('');
      setInputChange('');
    } catch (e) {
      setErr(e.message)
    }
    
  }
  
  const fetchEditTask = (taskId, task) => {
    console.log("editing the " + taskId);
    setInputChange(task)
    setIsEdit(true)
    setTasked(taskId)
    inputRef.current.focus();
  }

  const submitToDataBase = async (obj) => {
    
    //console.log(obj);
    //setToDo(prev => [...prev, obj]); 
    async function fetchPost (obj) {
      const response = await fetch(URL + '.json', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      }) // do a post request
  
      if(!response.ok){
        throw new Error('Something went wrong with posting to database')
      } // if error throw erro
      const data = await response.json();
      return data; // else return data {name: -asdfiwerqwerasdf}
    }

    try{ // try to send data
      const data = await fetchPost(obj);
      setToDo(prev => [...prev, {...obj, id: data.name}]) // if success update state
      console.log(data);
    } catch (e) { // if failed dont set state
      setErr(e.message)
      console.log('soemthing went error')
    }
  }
  //above is the posting logic

  // const removeItemFromArr = (indexNum) =>{
  //   setToDo(prev => prev.pull(indexNum))
  // }

  const fetchTask = useCallback(async () => {
    async function fetchGet() {
      const response = await fetch(URL + '.json'); // get data
      if(!response.ok){
        throw new Error('Something went wrong with fetching from database')
      }
      const data = await response.json();
      //console.log(data);
      return data;
    }
    
    try{ // try to fetch data then update state to display item
      let data = await fetchGet();
      let taskArr = [];
      for (const key in data){
        taskArr.push({
          id: key,
          task: data[key].task,
        })
      }
      setToDo(taskArr);
      console.log(data);
      console.log('fetch success')
    } catch (e) { // failed do something else
      setErr(e.message);
      console.log('soemthing went error')
    }
    
  }, [])

  const deleteTask = async(taskId) => {
    console.log(taskId);
    console.log(toDo);
    async function fetchDel(){
      const response = await fetch(URL+'/'+taskId+'.json',{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok){
        throw new Error ('Something went wrong when deleting data from data base')
      }
      console.log(response);
      return null
    }
  
    try {
      await fetchDel();
      let newArr = toDo.filter(object => object.id !== taskId)
      setToDo(newArr);
    } catch (e) {
      setErr(e.message);
    }
    
  }

const fetchButtonHandler = () => {
  fetchTask();
}

  useEffect(()=>{
    fetchTask();
  },[fetchTask]) // since fetchTask wont change will only run init

  const toDoArr = toDo.map((toDoItem )=> {
  return (<DisplayToDo 
    className={'list-group-item '} 
    key={toDoItem.id} 
    id={toDoItem.id} 
    toDo={toDoItem.task} 
    onDelete={deleteTask} 
    onEditTask={fetchEditTask} />)} )
  // above is the fetching logic

  return (
    <div className="App">
      <header className="App-header">
        <ToDoForm 
        focusRef={inputRef} 
        onSubmitForm={submitToDataBase} 
        inputChange={inputChange}
        setInputChange={inputChangeHandler}
        isEdit={isEdit}
        onDoneEdit={saveEditTask}
        />
        <div className='w-50'>
          <Button onClick={fetchButtonHandler}>Fetch task</Button>
          <ul className="list-group  red">
                {toDoArr}
          </ul>
        </div>

      </header>
    </div>
  );
}

export default App;
