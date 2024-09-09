import './App.css'

import EmployeeForm from './pages/EmployeeForm'
import StudentsForm from './pages/StudentsForm'
import Homepage from './pages/Homepage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/students" element={<StudentsForm />} />
          <Route path="/employee" element={<EmployeeForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
