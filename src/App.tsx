import React from 'react';
import { AppProvider } from './contexts/app/app.provider';
import { ThemeProvider, createMuiTheme, Container } from '@material-ui/core';
import { Header } from './components/Header';
import { WeatherList } from './components/WeatherList';

const theme = createMuiTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Container maxWidth='lg'>
          <Header>Weather Report 2000</Header>
          <WeatherList />
        </Container>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
