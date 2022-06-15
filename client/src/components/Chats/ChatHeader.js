import React, { useState } from 'react'
import './ChatHeader.css'

function ChatHeader({ chat }) {
    
    let complete_Time = String(new Date(`${chat?.last_message?.created} UTC`))
    var day =  chat?.last_message?.created !== undefined ? `Active ${complete_Time?.substring(0,3)}` :""
    var mon =  chat?.last_message.created !== undefined ? complete_Time?.substring(4,7) : ""
    var date = chat?.last_message.created !== undefined ? complete_Time?.substring(8,10) : "" 
    // console.log(day,mon,date);
    // console.log(chat);
    let time = []
    time.push(chat?.last_message?.created !== undefined ? complete_Time?.substring(16,18) : '')
    time.push(chat?.last_message?.created !== undefined ? `:${complete_Time?.substring(19,21)}` : '')
    time.push(chat?.last_message?.created !== undefined ? time[0] >= 0 && time[0]<12 ? "AM" :"PM" : '') 
    time[0] = time[0] > 12 && time[0] <= 23 ? time[0]-12 : time[0]  
    // console.log(time);

    if(chat?.last_message?.created == ""){
        day = mon = date = "" 
        time[0] = time[1] = time[2] = ""
    }
    return (
        <div className="chatHeader-style" >
            <h2>{chat?.title}</h2>
            {`${day} ${date} ${mon} ${time[0]}${time[1]} ${time[2]}`}
        </div>
    )
}

export default ChatHeader
