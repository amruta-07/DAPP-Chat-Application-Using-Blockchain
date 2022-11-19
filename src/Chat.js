import React,{useEffect} from 'react'
import GUN from 'gun'
import 'gun/sea'
import 'gun/lib/webrtc'
import { User } from './Users1'
const db=GUN()
export default function Chat() {
    const [user, setUser] = React.useState("")
    const [chats, setChats] = React.useState([])
    useEffect(()=>{
        // user.get('alias').on(v => username.set(v))

db.on('auth', async(event) => {
    const alias = await User.get('alias'); // username string

    console.log(`signed in as ${alias}`);
});
        db.get("chats").map().on((data,key)=>{
            setChats(chats=>[...chats,data])
        })
        //get username from db
        db.get("user").get("alias").on((data,key)=>{
            console.log(data)
            setUser(data)
        }
        )


    },[])
  return (
    <div>
        <h1>Chat</h1>
        <h2>{user}</h2>
            <div>
                    {chats.map((chat,i)=>{
                        return <div key={i}>{chat.alias}:{chat.message}</div>

                    }  
                    )}
                    </div>          
    </div>
  )
}
