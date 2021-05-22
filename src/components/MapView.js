import React, {useEffect, useState } from 'react'
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import socket from './Socket'
import L from 'leaflet';



const MapView = () => {
    const [position, setPosition] = useState({}); // Posicion de un vuelo
    const [trajectory, setTrajectory] = useState({});
    const [flights, setFlights] = useState([]); // Almaceno lo que entrega FLIGHTS, para tener origen y destino de cada uno.
    const [displayPos, setDisplayPos] = useState(false)
    
    const colorOptions = [
        {color: 'black'},
        {color: 'lime'},
        {color: 'yellow'},
        {color: 'purple'},
        {color: 'red'},
        {color: 'blue'},
        {color: 'white'},
        {color: 'gray'},
        {color: 'orange'},
        {color: 'pink'},
    ]


    useEffect(() => {
        socket.on('FLIGHTS', (data) => {
            console.log('Recibiendo FLIGHTS en MapView')
            setFlights(data)
        })
        //return () => {socket.off()}
        return () => {}
    }, [])

    useEffect(() => {
        socket.on('POSITION', (data) => {
            console.log('Recibiendo ubicacion actual del vuelo ', data.code)
            const newPosition = {};
            newPosition[data.code] = data.position
            setPosition(position => {return {...position, ...newPosition}; })
            const newTrajectory = {};
            if (data.code in trajectory){
                newTrajectory[data.code] = [...trajectory[data.code], data.position];
                console.log(newTrajectory)
            }
            else {
                newTrajectory[data.code] = [data.position];
            }
            setTrajectory(trajectory => {return {...trajectory, ...newTrajectory}})
            // console.log(trajectory)
            setDisplayPos(true);
         })
         return () => {}
    }, [])

    // const plane_icon = L.icon({
    //     iconUrl: require('../static/icons/carnet.jpg'),
    //     iconSize:     [20, 20], // size of the icon
    //     shadowSize:   [50, 64], // size of the shadow
    // });

    return (
            <MapContainer center={[-32,-70]} zoom={4} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
                </TileLayer>
                {/* Markers de origen de vuelos */}
                {flights.map((flight) => {
                    return(<Marker color={'black'} position={flight.origin}>
                    <Popup>Origen de {flight.code}</Popup>
                    </Marker>)
                }
                )}
                {/* Markers de destino de vuelos*/}
                {
                flights.map((flight) => {
                    return (<Marker position={flight.destination}>
                            <Popup>Destino de {flight.code}</Popup>
                        </Marker>)
                    }
                )} 

                {
                    flights.map((flight, i) => {
                        return (
                            <Polyline pathOptions={colorOptions[6]}  positions={[flight.origin, flight.destination]} />
                    )}
                )}

                {      
                    displayPos &&
                    Object.keys(position).map((positon_key, i) => {
                        return (
                        <Marker position={position[positon_key]}>
                        <Popup>Vuelo {positon_key}</Popup>
                        </Marker>
                        )}
                    ) 
                }

                {      
                 displayPos &&
                    Object.keys(trajectory).map((trajectory_key, i) => {
                        return (<Polyline pathOptions={colorOptions[i]} positions={[...trajectory[trajectory_key]]} />)}
                    ) 
                }
                
                    
            </MapContainer>
    )
}

export default MapView
