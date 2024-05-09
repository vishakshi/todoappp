import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/todos';

const getAllTodos = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

const addTodo = async (text) => {
  const response = await axios.post(apiUrl, { text });
  return response.data;
};


const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  
export { getAllTodos, addTodo, deleteTodo };
