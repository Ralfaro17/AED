import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ParishionersForm from './pages/ParishionersForm'
import ClinicForm from './pages/ClinicForm'
import { ThemeProvider } from './components/theme-provider'
import './App.css'

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Homepage}/>
          <Route path="/parishioners" Component={ParishionersForm}/>
          <Route path="/clinic" Component={ClinicForm}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
