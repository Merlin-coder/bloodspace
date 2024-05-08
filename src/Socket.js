import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socketAction } from 'redux/actions/socketAction';
import { createAlert } from 'redux/actions';

const Socket = ({ children }) => {
    const socket = useSelector((state) => state.socketReducer.socket);
    const dispatch = useDispatch();
    const [connect, setConnect] = useState(false);
    useEffect(() => {
        dispatch(socketAction('socket'));
    }, []);
    useEffect(() => {
        //
        if (socket?.connect && !connect) {
            console.log(socket, 'socket main socket file');
            setConnect(true);
            /*dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'socket connected',
                    alertType: 'success'
                })
            );*/
        } else if (socket?.connect === false && connect) {
            console.log(socket, 'socket main socket file');
            setConnect(false);
            /*dispatch(
                createAlert({
                    showAlert: true,
                    alertMessage: 'socket disconnected',
                    alertType: 'success'
                })
            );*/
        }
    }, [socket]);
    return <>{children}</>;
};

export default Socket;
