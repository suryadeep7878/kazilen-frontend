// import { useEffect, useState, useCallback, useRef } from 'react';

// const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/worker-status/";

// /**
//  * Hook to manage real-time WebSocket connection for worker updates
//  */
// export function useWorkerSocket() {
//     const [lastUpdate, setLastUpdate] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const socketRef = useRef(null);

//     const connect = useCallback(() => {
//         const token = localStorage.getItem("session_token");
//         if (!token) return;

//         const url = `${WS_BASE_URL}?token=${token}`;
//         const socket = new WebSocket(url);

//         socket.onopen = () => {
//             console.log("WebSocket Connected");
//             setIsConnected(true);
//         };

//         socket.onmessage = (event) => {
//             try {
//                 const data = JSON.parse(event.data);
//                 console.log("WebSocket Update Received:", data);
//                 setLastUpdate(data);
//             } catch (err) {
//                 console.error("Failed to parse WebSocket message:", err);
//             }
//         };

//         socket.onclose = () => {
//             console.log("WebSocket Disconnected");
//             setIsConnected(false);
//             // Reconnect logic after delay
//             setTimeout(connect, 3000);
//         };

//         socket.onerror = (err) => {
//             console.error("WebSocket Error:", err);
//             socket.close();
//         };

//         socketRef.current = socket;
//     }, []);

//     useEffect(() => {
//         connect();
//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.close();
//             }
//         };
//     }, [connect]);

//     return { lastUpdate, isConnected };
// }

// import { useEffect, useState, useCallback, useRef } from 'react';

// const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/worker-status/";
// const MAX_RETRIES = 5;
// const RETRY_INTERVAL = 3000;

// /**
//  * Hook to manage real-time WebSocket connection for worker updates
//  */
// export function useWorkerSocket() {
//     const [lastUpdate, setLastUpdate] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [isError, setIsError] = useState(false);
    
//     const socketRef = useRef(null);
//     const reconnectTimeoutRef = useRef(null);
//     const retryCountRef = useRef(0);
//     const isMountedRef = useRef(true);

//     const connect = useCallback(() => {
//         // Clear any existing connection/timeout
//         if (socketRef.current) {
//             socketRef.current.close();
//         }
//         if (reconnectTimeoutRef.current) {
//             clearTimeout(reconnectTimeoutRef.current);
//         }

//         const token = localStorage.getItem("session_token");
//         if (!token) {
//             setIsError(true);
//             return;
//         }

//         const url = `${WS_BASE_URL}?token=${token}`;
//         const socket = new WebSocket(url);

//         socket.onopen = () => {
//             if (!isMountedRef.current) return;
//             console.log("WebSocket Connected");
//             setIsConnected(true);
//             setIsError(false);
//             retryCountRef.current = 0; // Reset retries on successful connection
//         };

//         socket.onmessage = (event) => {
//             if (!isMountedRef.current) return;
//             try {
//                 const data = JSON.parse(event.data);
//                 console.log("WebSocket Update Received:", data);
//                 setLastUpdate(data);
//             } catch (err) {
//                 console.error("Failed to parse WebSocket message:", err);
//             }
//         };

//         socket.onclose = (event) => {
//             if (!isMountedRef.current) return;
            
//             console.log("WebSocket Disconnected:", event.code);
//             setIsConnected(false);
            
//             // Reconnect logic with cap
//             if (retryCountRef.current < MAX_RETRIES) {
//                 retryCountRef.current += 1;
//                 console.log(`WebSocket Reconnecting... Attempt ${retryCountRef.current}/${MAX_RETRIES}`);
//                 reconnectTimeoutRef.current = setTimeout(connect, RETRY_INTERVAL);
//             } else {
//                 console.error("WebSocket reached maximum reconnection attempts.");
//                 setIsError(true);
//             }
//         };

//         socket.onerror = (err) => {
//             if (!isMountedRef.current) return;
//             console.error("WebSocket Error:", err);
//             // Error will trigger onclose which handles reconnection
//             socket.close();
//         };

//         socketRef.current = socket;
//     }, []);

//     useEffect(() => {
//         isMountedRef.current = true;
//         connect();
        
//         return () => {
//             isMountedRef.current = false;
//             if (socketRef.current) {
//                 socketRef.current.onclose = null; // Prevent onclose firing during cleanup
//                 socketRef.current.close();
//             }
//             if (reconnectTimeoutRef.current) {
//                 clearTimeout(reconnectTimeoutRef.current);
//             }
//         };
//     }, [connect]);

//     return { 
//         lastUpdate, 
//         isConnected, 
//         isError,
//         retry: connect 
//     };
// }
