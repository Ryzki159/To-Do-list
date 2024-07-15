import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Container, IconButton, Box, Divider } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ListManager from './components/ListManager';
import TodoList from './components/TodoList';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Todo List
          </Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Box display="flex" mt={2}>
          <Box flexGrow={1}>
            <ListManager setSelectedList={setSelectedList} />
          </Box>
        </Box>
      </Container>
      <Divider />
      <Container>
          <Box flexGrow={3} ml={2}>
            {selectedList ? (
              <>
                <Typography variant="h5" gutterBottom>{selectedList.title}</Typography>
                <TodoList listId={selectedList.id} />
              </>
            ) : (
              <Typography variant="h5">Select a list to view todos</Typography>
            )}
          </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;