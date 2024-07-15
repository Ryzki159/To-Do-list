import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Container, TextField, Button, Box, Typography } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

const API_URL = 'https://669542004bd61d8314cab521.mockapi.io/lists';

function ListManager({ setSelectedList }) {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [editingListTitle, setEditingListTitle] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(response => {
      setLists(response.data);
    });
  }, []);

  const addList = () => {
    if (newListTitle.trim() === '') return;
    const newList = { title: newListTitle };
    axios.post(API_URL, newList).then(response => {
      setLists([...lists, response.data]);
      setNewListTitle('');
    });
  };

  const deleteList = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setLists(lists.filter(list => list.id !== id));
    });
  };

  const startEditing = (list) => {
    setEditingListId(list.id);
    setEditingListTitle(list.title);
  };

  const saveEditing = (id) => {
    axios.put(`${API_URL}/${id}`, { title: editingListTitle }).then(response => {
      setLists(lists.map(list => list.id === id ? response.data : list));
      setEditingListId(null);
      setEditingListTitle('');
    });
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Manage Lists</Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="New List"
          variant="outlined"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={addList} variant="contained" color="primary" style={{ marginLeft: '1em', height: 'fit-content' }}>
          Add
        </Button>
      </Box>
      <List>
        {lists.map(list => (
          <ListItem 
            key={list.id} 
            button 
            onClick={() => setSelectedList(list)}
            style={{
              border: '1px solid gray',
              borderRadius: '4px',
              margin: '8px 0'
            }}>
            {editingListId === list.id ? (
              <TextField
                value={editingListTitle}
                onChange={(e) => setEditingListTitle(e.target.value)}
                fullWidth
              />
            ) : (
              <ListItemText primary={list.title} />
            )}
            <ListItemSecondaryAction>
              {editingListId === list.id ? (
                <IconButton edge="end" onClick={() => saveEditing(list.id)}>
                  <Save />
                </IconButton>
              ) : (
                <IconButton edge="end" onClick={() => startEditing(list)}>
                  <Edit />
                </IconButton>
              )}
              <IconButton edge="end" onClick={() => deleteList(list.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ListManager;