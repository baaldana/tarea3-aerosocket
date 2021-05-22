import React, {useEffect, useState } from 'react'
import Button from './Button'
import socket from './Socket'



const FlightInfo = () => {
    const [flights, setFlights] = useState([]);
    
    useEffect(() => {
        socket.on('FLIGHTS', (data) => {
            console.log('Recibiendo FLIGHTS')
            setFlights(data)
        })
        //return () => {socket.off()}
        return () => {}
    }, [])

    const submit = (e) => {
        e.preventDefault();
        console.log('Pidiendo FLIGHTS')
        socket.emit('FLIGHTS', {});
    }

    return (
        <div className='flights_container'>
            <form onSubmit={submit}>
                <Button text='Info de Vuelos'/>
                {
                    flights.length>0 &&
                    <table>
                    <tr>
                        <th>Código</th>
                        <th>Aerolínea</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Modelo</th>
                        <th>Num Asientos</th>
                    </tr>
                    {flights.map((flight,i) => 
                        <tr key={i}>
                            <td>{flight.code}</td>
                            <td>{flight.airline}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{flight.plane}</td>
                            <td>{flight.seats}</td>
                        </tr>)}
                    
                    </table>
                }
                
                
            </form>
        </div>
    )
}

export default FlightInfo
