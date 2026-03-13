import React, { useEffect, useContext, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ToastContext } from '../Context/ToastContext';
import { ShopContext } from '../Context/ShopContext';

export default function WebSocketNotification() {
    const { addToast } = useContext(ToastContext);
    const { user } = useContext(ShopContext);
    const clientRef = useRef(null);

    useEffect(() => {
        // If no user is logged in, you could choose to disconnect, but let's connect so they can see live site activity

        const socket = new SockJS('http://localhost:8080/ws-notifications');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => {
                // Uncomment to see STOMP debugging
                // console.log(str);
            },
            onConnect: () => {
                console.log('Connected to WebSocket server');
                // Subscribe to public notifications
                stompClient.subscribe('/topic/notifications', (message) => {
                    const data = JSON.parse(message.body);
                    console.log('Received WebSocket Message:', data);

                    // Check if this notification belongs to the current user
                    // or just show a generic "Someone just bought" toast for a live-feed feel
                    if (user && user.email === data.email) {
                        addToast(`Your Order #${data.orderId} was confirmed! Total: $${data.total}`, 'success');
                    } else {
                        // Live sales feed metric (social proof)
                        addToast(`Live Sale! Order #${data.orderId} was just placed.`, 'info');
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.activate();
        clientRef.current = stompClient;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, [addToast, user]);

    return null; // This is a headless component
}
