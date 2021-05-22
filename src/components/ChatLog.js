import React, { useState, useEffect, useRef} from 'react';
import Button from './Button';
import socket from './Socket'


const ChatLog = ({ nombre }) => {
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect( () => {
        socket.on('CHAT', (data) => {
            console.log('cambiando log chat')
            setMessages(messages=>[...messages, data]);   
            //scrollToBottom()
        })
        //return () => {socket.off()}
        return () => {}
    }, [])

    
    // for (let i=0; i<messages.length; i++) {
    //     messages[i].date = join(Date(messages[i].date, date_format, '-'));
    // }

    // {new Date(e.date).getDate()}-{new Date(e.date).getMonth()}-{new Date(e.date).getFullYear()}
    return (
        <div className='chat_log'>
            {messages.map((e,i) => <div key={i}> {new Date(e.date).toLocaleString('es-CL')} | {e.name}: {e.message}</div>)}
            <div ref={messagesEndRef}/>
        </div>
    )
}

export default ChatLog
