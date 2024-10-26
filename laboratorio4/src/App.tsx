import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import ParishionersForm from './pages/ParishionersForm'
import ClinicForm from './pages/ClinicForm'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Homepage}/>
        <Route path="/parishioners" Component={ParishionersForm}/>
        <Route path="/clinic" Component={ClinicForm}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
