import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./One.css"



function NameInput() {
    const navigate=useNavigate()
    const [name, setname] = useState("")

    const typeName =()=>{
        if(name.trim("")==""){
            alert("Name should not be empty")
        }
        else{
           navigate("/Chat/"+name)
        }
        


    }
  return (
    <div>
    <div class="container">

      <form id="sign-form" class="sign-form" onSubmit={e =>{console.log("amru")
       typeName()
      e.preventDefault()} }>
        <li>
          <span><label for="name">Hi, What is your Name?</label></span>
          <input class="active" id="name" name="name" type="text" placeholder="Enter your full name" onChange={e =>{setname(e.target.value)}} autofocus />
        </li>



      </form>

    </div>

       
    </div>
  )
}

export default NameInput
