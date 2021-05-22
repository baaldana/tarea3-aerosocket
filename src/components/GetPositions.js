import React, { useState, useEffect } from 'react';
import socket from './Socket'

const GetPositions = () => {
    const [position, setPosition] = useState('No Position Yet');


    useEffect(() => {
        socket.on("POSITION", (...args) => {
            console.log(args)
            return () => {socket.off()}
        });
    }
    );

}

export default GetPositions
