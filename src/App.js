import React, { useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate,useNavigate } from "react-router-dom"
import Chat from './Chat'
import Login from './Login'
import RegistrationForm from './registration'

function App() {
  const [islogin,setislogin]=React.useState(false)
  const [name,setName]=React.useState("")
  const [loading,setloading]=React.useState(true)
  useEffect(() => {
    const islogin_=localStorage.getItem("islogin")
    console.log(islogin_,"sdf")
    if(islogin_==null||islogin_==undefined||islogin_==false){
      setislogin(false)
    }else{

      setislogin(islogin_)
    }
    const name_=localStorage.getItem("name")
    setName(name_)
    setloading(false)
  }, [])
  return (
    loading?<div>Loading...</div>:
    <div>
    <Routes>

    <Route path="/" element={<Login/>} />

    
   
    
    <Route path="/login"element={<Login/> } />
    
    
    <Route path="/register" element={ <RegistrationForm/> } />


    <Route path="Chat/:username" element={<Chat/>
    } />    
  </Routes>
    </div>
  )
}

export default App
