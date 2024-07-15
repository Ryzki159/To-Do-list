import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import TodoForm from './TodoForm';

const API_URL = 'https://669542004bd61d8314cab521.mockapi.io/todos';

function TodoList({ listId }) {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then(response => {
      setTodos(response.data.filter(todo => todo.listId === listId));
    });
  }, [listId]);

  const addTodo = (todo) => {
    axios.post(API_URL, { ...todo, listId }).then(response => {
      setTodos([...todos, response.data]);
    });
  };

  const updateTodo = (todo) => {
    axios.put(`${API_URL}/${todo.id}`, todo).then(response => {
      setTodos(todos.map(t => t.id === todo.id ? response.data : t));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(updatedTodo);
  };

  return (
    <Container>
      <TodoForm addTodo={addTodo} editingTodo={editingTodo} setEditingTodo={setEditingTodo} updateTodo={updateTodo} />
      <List>
        {todos.map(todo => (
          <ListItem
            key={todo.id}
            button
            onClick={() => toggleComplete(todo.id)}
            style={{ 
              backgroundColor: todo.completed ? 'lightgreen' : 'inherit',
              border: '1px solid gray',
              borderRadius: '4px',
              margin: '8px 0'
             }}
          >
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="body1" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Priority: ${todo.priority} | Due: ${todo.dueDate} | Tags: ${todo.tags.join(', ')}`}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => setEditingTodo(todo)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TodoList;