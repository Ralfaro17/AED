import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Queries from './pages/Queries';
import './App.css'
import { ThemeProvider } from './components/theme-provider';

function App() {
  useEffect(() => {
    document.title = 'Laboratorio 5';
  }, []);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Main} />
          <Route path='/queries' Component={Queries} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
