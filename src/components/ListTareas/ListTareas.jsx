import React, { useReducer, useRef } from 'react';

const ListTareas = () => {
  const inputRef = useRef();
  const [editIndex, setEditIndex] = React.useState(null);

  const [task, dispatch] = useReducer((state = [], action) => {
    switch (action.type) {
      case 'add_task': {
        return [...state, { id: state.length, title: action.title }];
      }
      case 'remover_task': {
        return state.filter((_, index) => index !== action.index);
      }
      case 'update_task': {
        return state.map((t, index) => 
          index === action.index ? { ...t, title: action.title } : t
        );
      }
      default: {
        return state;
      }
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      dispatch({
        type: 'update_task',
        index: editIndex,
        title: inputRef.current.value,
      });
      setEditIndex(null);
    } else {
      dispatch({
        type: 'add_task',
        title: inputRef.current.value,
      });
    }
    inputRef.current.value = '';
  };

  const handleEdit = (index) => {
    console.log(index)
    setEditIndex(index);
    inputRef.current.value = task[index].title;
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <form>
        <label>Tarea</label>
        <input type="text" name="title" ref={inputRef} />
        <input type="submit" onClick={handleSubmit} value={editIndex !== null ? "Actualizar" : "Enviar"} />
      </form>

      <div>
        {task && task.map((tas, index) => (
          <div key={tas.id}>
            <p>{tas.title}</p>
            <button onClick={() => handleEdit(index)}>Editars</button>
            <button onClick={() => dispatch({ type: 'remover_task', index })}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTareas;
