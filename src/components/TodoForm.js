import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Chip } from '@mui/material';
import { Save } from '@mui/icons-material';

function TodoForm({ addTodo, editingTodo, setEditingTodo, updateTodo }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setPriority(editingTodo.priority);
      setDueDate(editingTodo.dueDate);
      setTags(editingTodo.tags || []);
    } else {
      setTitle('');
      setPriority('');
      setDueDate('');
      setTags([]);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = { title, priority, dueDate, tags, completed: false };
    if (editingTodo) {
      updateTodo({
        ...editingTodo,
        title,
        priority,
        dueDate,
        tags
      });
    } else {
      addTodo(todo);
    }
    setTitle('');
    setPriority('');
    setDueDate('');
    setTags([]);
    setTagInput('');
    setEditingTodo && setEditingTodo(null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" mb={2}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Priority"
        variant="outlined"
        select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
      <TextField
        label="Due Date"
        variant="outlined"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          label="Tags"
          variant="outlined"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddTag} variant="contained" color="primary" style={{ marginLeft: '1em' }}>
          Add Tag
        </Button>
      </Box>
      <Box mt={2}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={handleDeleteTag(tag)}
            style={{ marginRight: '0.5em', marginBottom: '0.5em' }}
          />
        ))}
      </Box>
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" startIcon={<Save />}>
          {editingTodo ? 'Update' : 'Add'} Todo
        </Button>
      </Box>
    </Box>
  );
}

export default TodoForm;