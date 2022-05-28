
import './App.css';
import {useEffect, useState} from 'react'
import List from './List';
import Alert from './Alert'
const getLocalStorage=()=>{
  let list=localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

 function App() {
  const[data,setData]=useState('')
  const [list,setList]=useState(getLocalStorage())
  const [editing,setEditing]=useState(false)
  const[editItem,setEditItem]=useState(null)
  const[alert,setAlert]=useState({show:false,msg:'',type:''})
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('hello')
    if(!data){
      // setAlert({show:true,msg:"enter the value",type:"danger"})
      showAlert(true , 'please enter value' , 'danger')
}
    else if(data && editing){
    setList(list.map((item)=>{
      if(item.id===editItem){
        return {...item,title:data}
      }
      return item;
    }))
    }
    else{
      let newList={id:new Date().getTime().toString(),title:data}
      setList([...list,newList])
    }
    setData('')
    setEditItem(null)
    setEditing(false)
    // showAlert
  }
  
  
  const showAlert=(show=false,msg='',type='')=>{
    setAlert({show,msg,type})
  }
  
  const handleClear=()=>{
    showAlert(true , 'Empty List' , 'danger')
    setList([])
  }
 
  const handleDelete=(id)=>{
    setList(list.filter((filterItems)=>{ return filterItems.id!==id}))
     }
  const handleEdit=(id)=>{
    const specificItem=list.find((findItem)=>{return findItem.id===id})
    setEditItem(id)
    setEditing(true)
    
    setData(specificItem.title)
  }
 useEffect(()=>{
   localStorage.setItem('list',JSON.stringify(list))
 },[list])
  return (
    <section>
    <div className='form'>
     {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
    <form onSubmit={handleSubmit}>
     <h1>To do list</h1>
       <input type="text" value={data} onChange={(e)=>setData(e.target.value)} className="formcontrol" />
       <button className='btn btn-primary' style={{height:'40px'}}>{ editing ?'Edit':'Add'}</button>
       
      </form>
     
      { list.length>0 && (
       <div>
      <List items={list} removeItem={handleDelete}  editItem={handleEdit} />
      <button type="button" className="btn btn-outline-danger" style={{marginLeft:'230px'}} onClick={handleClear}>Clear item</button>
      </div>
      )
 }
  </div>
    </section>
  );
}

export default App;
