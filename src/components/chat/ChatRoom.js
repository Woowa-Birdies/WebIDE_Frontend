
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import styles from './ChatRoom.module.css';

function ChatRoom() {
  const jwtToken = useSelector((state) => state.loginSlice.accessToken);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new Client({
      brokerURL: "ws://localhost:8080/ws", // 서버의 WebSocket 연결 주소
      connectHeaders: {
        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 인증 헤더
      },
      debug: function (str) {
        console.log('STOMP Debug', str);
      },
      onConnect: () => {
        console.log("Connected to STOMP");
        newClient.subscribe('/sub/chat', (payload) => {
          console.log("Received message", payload.body);
          displayMessage(JSON.parse(payload.body).message);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from STOMP");
      }
    });

    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, [jwtToken]);

  const onClick = () => {
    if (client && client.connected) {
      console.log("Sending message");
      client.publish({
        destination: '/pub/chat',
        body: JSON.stringify({ message: 'hello' }),
      });
    } else {
      console.log("Client is not connected.");
    }
  };
  const displayMessage = (message) => {
    const chatMessage = document.getElementById('msg');
    const createMessage = document.createElement('td');
    createMessage.innerText = message;
    chatMessage.appendChild(createMessage);
  }
  return (
    <div>
      <div className={styles.container}>
        채팅 내용이 보이는 곳
        <tr id="msg"></tr>
        </div>
      <button onClick={onClick}>전송</button>
    </div>
  );
}

export default ChatRoom;
