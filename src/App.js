import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Chat from './Chat'
import NameInput from './NameInput'

function App() {
  return (
    <div>
    <Routes>
    <Route path="/" element={ <NameInput/> } />
    <Route path="Chat/:username" element={ <Chat/> } />
    
  </Routes>
    </div>
  )
}

export default App
