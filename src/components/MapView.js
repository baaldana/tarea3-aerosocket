import React, {useEffect, useState } from 'react'
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import Button from './Button'
import socket from './Socket'
import L from 'leaflet';



const MapView = () => {
    const [position, setPosition] = useState({}); // Posicion de un vuelo
    const [trajectory, setTrajectory] = useState({});
    const [flights, setFlights] = useState([]); // Almaceno lo que entrega FLIGHTS, para tener origen y destino de cada uno.
    const [activateMap, setActivateMap] = useState(false);
    const [displayPos, setDisplayPos] = useState(false);
    const [displayTrajectory, setDisplayTrajectory] = useState(false);
    
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
        return () => {}
    }, [])


    useEffect(() => {
        socket.on('POSITION', (data) => {
            console.log('Recibiendo ubicacion actual del vuelo ', data.code)
            const newPosition = {};
            newPosition[data.code] = data.position
            setPosition(position => {return {...position, ...newPosition}; })
            setDisplayPos(true);
         })
         return () => {}
    }, [])

    useEffect( () => {
        socket.on('POSITION', (data) => {
            const newTrajectory = {};        
            setTrajectory( trajectory => {
                if (trajectory.hasOwnProperty(data.code)) {
                    if (data.position in [...trajectory[data.code]]){
                        const current_trajectory = {...trajectory}
                        current_trajectory[data.code] = undefined;
                        return current_trajectory;
                    }
                    else {
                        newTrajectory[data.code] = [...trajectory[data.code], data.position];
                    }
                    
                }
                else {
                    newTrajectory[data.code] = [data.position];
                }
                return {...trajectory, ...newTrajectory}
            })
            setDisplayTrajectory(true);
        })
        return () => {}
    }, [])

    const mapActivator = (e) => {
        e.preventDefault();
        socket.emit('FLIGHTS', {});
        setActivateMap(true);
    }

    const plane_icon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Plane_icon.svg/1200px-Plane_icon.svg.png',
        iconSize:[20, 20], // size of the icon
        rotationAngle: 45
    });

    return (
            <div className='map_container'>
            {
                !activateMap &&
                <form onSubmit={mapActivator}>
                    <Button text='Activar el mapa' />
                </form>
            }
            {
                activateMap &&

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
                        <Marker position={position[positon_key]} icon={plane_icon}>
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
            }
            </div>
    )
}

export default MapView
