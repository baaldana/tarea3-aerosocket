import React, { useState, useEffect, useRef} from 'react';
import socket from './Socket';
import Button from './Button';

const ChatLog = ({ nombre }) => {
    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect( () => {
        socket.on('CHAT', (data) => {
            setMessages([...messages, data]);
            scrollToBottom()
        })
        return () => {socket.off()}
    }, [messages])


    return (
        <div className='chat_log'>
            {messages.map((e,i) => <div key={i}>{e.name}:{e.message}</div>)}
            <div ref={messagesEndRef}/>
        </div>
    )
}

export default ChatLog
