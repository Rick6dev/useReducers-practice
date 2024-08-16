import React, { useReducer ,useRef} from 'react'

const ListTareas = () => {
  const inputRef=useRef();

  const [task,dispatch] =useReducer((state=[],action)=>{
    console.log(action)

    switch(action.type){
      case'add_task':{
          return [...state,{id:state.length,title:action.title}]
      }
      case 'remover_task':{
        return state.filter((task,index)=>index != action.index)
      }
      default:{
        return state;
      }
    }


  });

  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch({
      type:'add_task',
      title:inputRef.current.value

    })

  }



  return (
    <div>
        <h1>Lista de Tareas</h1>
        <form>
            <label>Tarea</label>
            <input type="text" name="title" ref={inputRef} />
            {/* <input type="text" name="descripcion"/>
             */}
            <input type="submit" onClick={handleSubmit}  value="Enviar" />
        </form>

        <div className=''>

              {
                task && task.map((tas,index)=>(
                  <div key={tas.id}>
                    <p>{tas.title}</p>

                    <button onClick={()=>dispatch({type:'remover_task',index:index})}></button>
                  </div>
                ))
              }

        </div>
      
    </div>
  )
}

export default ListTareas
