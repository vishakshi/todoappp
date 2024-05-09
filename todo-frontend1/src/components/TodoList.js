// src/components/TodoList.js

import React, { useEffect, useState } from 'react';
import { getAllTodos, addTodo, deleteTodo } from '../services/todoService';
import axios from 'axios';

const apiUrl =  process.env.PORT ;



const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTodos();
      setTodos(data);
    };
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }; 
 
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      //const response = await axios.delete(apiUrl{id});
     // const response = await axios.delete(`/api/todos/${id}`);
      console.log(response.data.message); // Message from the backend
      setTodos(todos.filter(todo => todo._id !== id)); // Remove deleted todo from state
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const  EditTodo = async (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
    console.log(editTodoId)
    console.log(editTodoText)

  };
  const saveEditedTodo = async () => {
    try {
        console.log(editTodoText);
        await axios.put(`${apiUrl}/${editTodoId}`,{ text: editTodoText });
       // await axios.put(`/api/todos/${editTodoId}`, { text: editTodoText });
        setEditTodoId('');
        setEditTodoText('');
        fetchData();
        console.log('Todo updated successfully');
    } catch (error) {
        console.error('Error updating todo:', error);
    }
};

 
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                />
                <button onClick={saveEditedTodo}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => EditTodo(todo._id, todo.text)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default TodoList;
