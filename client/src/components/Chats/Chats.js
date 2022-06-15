import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import ChatHeader from './ChatHeader'
import axios from 'axios'

// default user creds :
// 1. email: jam@j.com , uid: 543212345
// 2. email: jam2@j.com , uid: 1234554321

function Chats() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const user = JSON.parse(localStorage.getItem('profile')) 
    const REACT_APP_CHAT_ENGINE_ID = 'ba3d3e53-c774-41ac-b629-493ac186f82f'
    const REACT_APP_CHAT_ENGINE_KEY = '740a0a65-3af9-45d2-817c-9f01fd79d74b'

    const getFile = async(url)=>{
        const response = await fetch(url)
        .then(()=>console.log("fetch successful"))
        .catch((error)=>console.log("fetch error: ",error));
        const data = await response?.blob()
        // returning files with an array where each object inside are specified
        //  as data. Setting the file name as userphoto.jpg and lastly type of the 
        // image is set to jpeg.
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
    }
    useEffect(() => {
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": REACT_APP_CHAT_ENGINE_ID,
                "user-name": user?.email,
                "user-secret": user?._id
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch((error)=>{
            // creating user if there is no existing user
            console.log("Axios get error :",error, "\n",error.response.data)
            let formdata = new FormData()
            formdata.append('email',user?.result?.email);
            formdata.append('username', user?.result?.email);
            formdata.append('secret', user?.result?._id);
            // console.log('Formdata: ',formdata.email);
            // let formdata = {
            //     "email": user?.email,
            //     "username" : user?.email,
            //     "secret" : user?.uid,
            // }
            getFile(user.photoURL).then((avatar)=>{
                // formdata.append('avatar', avatar, avatar?.name)
                // formdata = {...formdata, "avatar": avatar }
                console.log('Formdata: ',formdata);
                axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers: {"private-key": REACT_APP_CHAT_ENGINE_KEY }}
                ).then(()=> setLoading(false))
                .catch((error)=> console.log("Axios post error :",error, "\n",error.response.data))
            })
        })
    }, [user,navigate])
    
    // If there is no user or loading is true then we just print loading.
    // if(!user || loading )return "loading..."
    return (
            <div className="chats-page">
                <div className="nav-bar">
                    <div className="logo-tab">
                        Crea
                    </div>
                    <div  className="logout-tab">
                        Logout
                    </div>
                </div>
                    {/* <ChatEngine 
                        height="calc(90vh)"
                        projectID= {process.env.REACT_APP_CHAT_ENGINE_ID}
                        userName={user?.email}
                        userSecret= {user?.uid}
                    /> */}
		<ChatEngine
			projectID= {REACT_APP_CHAT_ENGINE_ID}
			userName=  {user?.result?.email}
			userSecret= {user?.result?._id}
			// Render Custom Components
			height='90vh'
			// renderChatList={(chatAppState) => {}}
			// renderChatCard={(chat, index) => {}}
			// renderNewChatForm={(creds) => {}}
			// renderChatFeed={(chatAppState) => {
            //     console.log("ChatAPP: ",chatAppState);
            // }}
			renderChatHeader={(chat) => {
                // console.log("chat: ",chat)
                return <ChatHeader chat={chat} />
            }}
			// renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => {
            //     console.log( message);
            // }}
			// renderIsTyping={(typers) => {}}
			// renderNewMessageForm={(creds, chatId) => {}}
			// renderChatSettings={(chatAppState) => {}}
			// renderChatSettingsTop={(creds, chat) => {}}
			// renderPeopleSettings={(creds, chat) => {}}
			// renderPhotosSettings={(chat) => {}}
			// renderOptionsSettings={(creds, chat) => {}}
		/>

            </div>
    )
}

export default Chats
