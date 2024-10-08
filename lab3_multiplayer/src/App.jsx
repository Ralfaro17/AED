import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MusicStreamingApp from './pages/Reproductor'
import BankSystemApp from './pages/BankSystemApp'
import ClientRegister from './pages/ClientRegister'
import Homepage from './pages/Homepage'
import BankPanel from './pages/BankPanel'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Homepage}/>
          <Route path="/music" Component={MusicStreamingApp}/>
          <Route path="/bank" Component={BankSystemApp}/>
          <Route path="/bank/register" Component={ClientRegister}/>
          <Route path="/bank/panel" Component={BankPanel}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
