import React, { useEffect } from 'react'
import "./login.css"
import Account from "./account.svg"
import { Link, useNavigate } from 'react-router-dom'
import Gun from 'gun'

const gun = Gun({
    peers: [
        'https://gunserver.onrender.com/gun'
    ]
})
function Login() {
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigate=useNavigate()
    const checkEmailandpassExists = async (email,password) => {
        return new Promise((resolve, reject) => {
        
        try {
            const usersRef = gun.get('users');
            console.log(usersRef)
        
           let emails = []
            usersRef.map().once((data, key) => {
                console.log(data)
                emails.push(data)
                if(data.email === email && data.password === password){
                    resolve(data)
                    return true
                }
            })
            setTimeout(() => {
                reject(false)
                
            }, 3000);
          
           
        } catch (error) {
            reject(false)  
            console.log(error)
        }
    })
    }

    const handleSubmit =  (event) => {
        event.preventDefault()
        checkEmailandpassExists(username,password).then((res) => {
            console.log(res)
            if(res){
                localStorage.setItem("islogin",true)
                localStorage.setItem("username",username)
                localStorage.setItem("profile",res.profilePic)

                localStorage.setItem("name",res.firstName+" "+res.lastName)
                navigate("/Chat/"+res.firstName+" "+res.lastName)
                
                // localStorage

                alert("Login Success")
            }else{
               
            }
        }).catch((err) => {
            console.log(err)
            alert("Please enter valid credentials")
        })

        
        



    }
    useEffect(() => {
        const usersRef = gun.get('users');
        // console.log(usersRef)
        // usersRef.map().once((data, key) => {
        //     console.log(data)
        //     console.log(key)
        // })



    }, [])

    return (
        <div class="body1"
        style={{

            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        }}
        >
            <div
            style={{
                width:"400px",
                height:"500px",
                alignItems:"center",
                justifyContent:"center",
                alignSelf:"center",

            }}
            >

            <legend>
                <img src={Account} width="45px" height="45px" />
            </legend>
            <h1>Login</h1>

            <form method="post"
                onSubmit={handleSubmit}
            >
                <div class="b">
                    <input
                        type={"email"}
                        required
                        maxLength={256}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}

                    />
                    <span></span>
                    <label>Username</label>
                </div>
                <div class="b">
                    <input type="Password" required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span></span>
                    <label>Password</label>
                </div>
                <div class="c">Forget password ?</div>
                <input type="submit" value="login" />
                <div class="d"

                >
                    Not register?<Link
                        to="/register"


                    >Resigter here</Link>
                </div>

            </form>
            </div>
        </div>
    )
}

export default Login