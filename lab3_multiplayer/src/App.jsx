import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MusicStreamingApp from './pages/Reproductor'
import BankSystemApp from './pages/BankSystemApp'
import Homepage from './pages/Homepage'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Homepage}/>
          <Route path="/music" Component={MusicStreamingApp}/>
          <Route path="/bank" Component={BankSystemApp}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
