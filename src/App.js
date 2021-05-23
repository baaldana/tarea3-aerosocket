import logo from './logo.svg';
import Header from './components/Header'
import ChatLog from './components/ChatLog'
import ChatMessage from './components/ChatMessage'
import FlightInfo from './components/FlightInfo'
import MapView from './components/MapView'
import {useEffect, useState} from 'react'


function App() {

  return (
    <div className="App">

      <Header />
      <main>
        <div className='big_container'>
          
            <MapView />
          
          
          <div className='chat_container'>
            <ChatLog />
            <ChatMessage />
          </div>
          
        </div>
        <FlightInfo />
        
      </main>
      
      <h3>Hecho por Benjamin Aldana</h3>
    </div>
  );
}

export default App;
