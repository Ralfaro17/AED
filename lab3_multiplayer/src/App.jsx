import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MusicStreamingApp from './pages/Reproductor'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={MusicStreamingApp}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
