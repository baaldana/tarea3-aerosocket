import React, {useEffect, useState } from 'react'
import socket from './Socket'
import Button from './Button'

const FlightInfo = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        socket.on('FLIGHTS', (data) => {
            console.log('Recibiendo FLIGHTS')
            setFlights(data)
        })
        return () => {socket.off()}
    }, [flights])

    const submit = (e) => {
        e.preventDefault();
        console.log('Pidiendo FLIGHTS')
        socket.emit('FLIGHTS', {});
    }

    return (
        <div>
            <form onSubmit={submit}>
                <Button text='Info de Vuelos'/>
                {flights.map((e,i) => <div key={i}>{e.code} {e.airline} {e.origin} {e.destination} {e.plane} {e.seats}</div>)}
            </form>
        </div>
    )
}

export default FlightInfo
