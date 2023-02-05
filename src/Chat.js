import './App.css'
import { useEffect, useState, useReducer,useRef } from 'react'
import Gun from 'gun'
import { faker } from '@faker-js/faker';
import CryptoJS from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';




// Port 5050 is the port of the gun server we previously created
const gun = Gun({
  peers: [
    'https://gunserver.onrender.com/gun'  ]
})

// The messages array will hold the chat messages
const currentState = {
  messages: []
}

// This reducer function will edit the messages array
const reducer = (state, message) => {
  return {
    messages: [...state.messages, message]
  }
}

function Chat() {
  const chatdiv = useRef(null)
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(reducer, currentState)
  let { username } = useParams();
  const navigate=useNavigate()



  // fires immediately the page loads
  useEffect(() => {
    const messagesRef = gun.get('Chat')
    messagesRef.map().on(m => {//real time change
      try {

        dispatch({
          sender: m.sender,
          avatar: m.avatar,
          content: CryptoJS.AES.decrypt(m.content, m.sender).toString(CryptoJS.enc.Utf8),
          timestamp: m.timestamp
        })
      } catch (e) {
        dispatch({
          sender: m.sender,
          avatar: m.avatar,
          content: m.content,
          timestamp: m.timestamp
        })
      }
    })
   



  }, [])

  // remove duplicate messages
  const newMessagesArray = () => {
    const formattedMessages = state.messages.filter((value, index) => {
      const _value = JSON.stringify(value)
      return (
        index ===
        state.messages.findIndex(obj => {
          return JSON.stringify(obj) === _value
        })
      )
    })

    return formattedMessages
  }

  // save message to gun / send message
  const sendMessage = () => {
    // a reference to the current room
    const messagesRef = gun.get('Chat')
    let image = localStorage.getItem("profile")

    // the message object to be sent/saved
    const messageObject = {
      sender: username,
      avatar: image,
      content: CryptoJS.AES.encrypt(messageText, username).toString(),
      timestamp: Date().substring(16, 21)
    }
    // console.log(messageObject)

    // this function sends/saves the message onto the p2p network
    messagesRef.set(messageObject)

    // clear the text field after message has been sent
    setMessageText('')
  }
  const onpressLogout = () => {
    localStorage.setItem("islogin", false)
    localStorage.setItem("name", "")
    localStorage.setItem("profile", "")
    navigate("/login", { replace: true })
    //
  }


  return <div className="App1">
    
    <main style={{ backgroundColor: "white" }}>
      <button
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        width: 100,


      

      }}
      onClick={onpressLogout}
      >
       Logout
      </button>
      <div className='messages1' style={{ backgroundColor: "white" }}
      ref={chatdiv}
      >
        <ul>
          {newMessagesArray().map((msg, index) => [
            <li key={index} className='message1'>
              <img alt='avatar' src={msg.avatar} />
              <div style={{ fontSize: 14 }}>
                {msg.content}
                <span>{msg.sender}</span>
              </div>
            </li>
          ])}
        </ul>
      </div>
      <div className='input-box1'>
        <input style={{ backgroundColor: "#0e0d0d", color: "white" }} placeholder='Type a message...' onChange={e => setMessageText(e.target.value)} value={messageText} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </main>
  </div>
}

export default Chat
