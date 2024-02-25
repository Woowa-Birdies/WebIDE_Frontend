import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import { Button, Flex,Input } from 'antd';

function ChatRoom() {
  const jwtToken = useSelector((state) => state.loginSlice.accessToken);
  const [client, setClient] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
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
        body: JSON.stringify({ message: inputMessage }),
      });
      setInputMessage('');
    } else {
      console.log("Client is not connected.");
    }
  };

  const displayMessage = (message) => { // 받은 메세지를 화면에 띄우는 과정
    const showMessage = document.getElementsByClassName('chatLog');
    const createMessage = document.createElement('div');
    createMessage.innerText = message;
    showMessage[0].appendChild(createMessage);
  }

  const { TextArea } = Input;
  return (
    <div>
        <div className="chatLog"></div>
        <>
            <TextArea
            rows={4}
            placeholder="입력"
            maxLength={5000}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}/>
        </>            
        <Button type="primary" onClick={onClick}>Primary Button</Button>
    </div>
  );
}

export default ChatRoom;
