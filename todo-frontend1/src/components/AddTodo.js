// src/components/AddTodo.js

import React, { useState } from 'react';
import { addTodo } from '../services/todoService';

const AddTodo = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await addTodo(text);
    setText('');
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit"Onclick={handleSubmit}>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
