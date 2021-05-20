import React, { useState, useEffect, useRef} from 'react';
import socket from './Socket';
import Button from './Button';

const ChatMessage = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [registered, setRegistered] = useState(false);

    const register = (e) => {
        e.preventDefault();
        if (name !== "") {
            setRegistered(true);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        socket.emit('CHAT', {name, message});
        setMessage('');
    }

    return (
        <div>
            {
                !registered &&
                <form onSubmit={register}>
                <label htmlFor=''>Escribe tu nombre:</label>
                <input value={name} onChange={e => setName(e.target.value)} />
                <Button color='gray' text='Ir al chat'/>
                </form>
            }
            {
                registered &&
                <form onSubmit={submit}>
                    <label htmlFor=''>Escribe tu mensaje</label>
                    <textarea name='' id='' cols='30' rows='1' value={message} onChange={e => setMessage(e.target.value)}>
                    </textarea>
                    <Button text='Enviar mensaje'/>
                </form>
            }
            
        </div>
    )
}

export default ChatMessage
