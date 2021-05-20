import logo from './logo.svg';
import Header from './components/Header'
import socket from './components/Socket'
import ChatLog from './components/ChatLog'
import ChatMessage from './components/ChatMessage'
import FlightInfo from './components/FlightInfo'
import {useEffect, useState} from 'react'
import io from 'sockjs-client';


function App() {

  // useEffect(() => {
  //   socket.on('POSITION', (data) => console.log(data.position))
  // }
  // )



  return (
    <div className="App">
      <Header />
      <div className='container'>
        <ChatLog />
        <ChatMessage />
      </div>
      
      <FlightInfo />
    </div>
  );
}

export default App;
