// src/App.js


import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import "./App.css"

const App = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;

