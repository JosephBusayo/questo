import React,{useState, useEffect} from 'react';
import './App.css';
import DND from './components/DragNDrop'



function App() {

  const [data, setData] = useState([
    {title: 'TODO', items: new Array()}, 
    {title: 'WIP', items: []},
    {title: 'DONE', items:[]}
  ])
  
  function handleUpdate(newtxt){
    if(newtxt !== ""){
      let temp_data = [...data]
      temp_data[0].items.push(newtxt)
      setData(temp_data)
    }
  } 
/*   function handleUpdate(newtxt){
    if(newtxt !== ""){
      let temp_data = [...data]
      let temp_todo = {...temp_data[0]}
      temp_todo.items = [...temp_todo.items, newtxt]
      temp_data[0] = temp_todo
      setData(temp_data)
    }
    console.log(data)
  } */
  return (
    <div className="App">
      <h1 className="heading">QUESTO</h1>
      <DND 
        data={data}
        handleUpdate = {handleUpdate}
      />
    </div>
  );
}

export default App;