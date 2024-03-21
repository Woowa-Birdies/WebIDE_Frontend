import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Client } from "@stomp/stompjs";
import { Button, Input } from "antd";
import styles from './ChatRoom.module.css';

function ChatRoom({ parameters }) {
  const jwtToken = useSelector((state) => state.loginSlice.accessToken);
  const [client, setClient] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const { TextArea } = Input;
  const { projectIdParam,keyHashParam } = parameters;
  const myKeyHash = parameters.hasOwnProperty('keyHashParam') ? parameters.keyHashParam : "supervisor";

  useEffect(() => {
    const newClient = new Client({
      // brokerURL: "ws://localhost:8080/ws", // 서버의 WebSocket 연결 주소
      brokerURL: "ec2-3-37-161-133.ap-northeast-2.compute.amazonaws.com", // 서버의 WebSocket 연결 주소
      connectHeaders: {
        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 인증 헤더
      },
      debug: function (str) {
        console.log("STOMP Debug", str);
      },
      onConnect: () => {
        console.log("Connected to STOMP");
        newClient.subscribe(`/sub/chat/${projectIdParam}`, (payload) => {
          console.log("Received message", payload.body);
          console.log("keyHashParam:",keyHashParam);
          displayMessage(payload);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from STOMP");
      },
    });

    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  },[]);

  const onClick = () => {
    if (client && client.connected) {
      client.publish({
        destination: `/pub/chat/${projectIdParam}`,
        body: JSON.stringify({ message: inputMessage,sender: myKeyHash }),
      });
      setInputMessage("");
    } else {
      console.log("Client is not connected.");
    }
  };

  const displayMessage = (payload) => {
    const message = JSON.parse(payload.body).message;
    const sender = JSON.parse(payload.body).sender;

    // 받은 메세지를 화면에 띄우는 과정
    const showMessage = document.getElementsByClassName("chatLog");
    const MessageContainer = document.createElement("div");
    const createMessage = document.createElement("div");
    
    MessageContainer.className = myKeyHash == sender ? `${styles["my-message-container"]}` : `${styles["your-message-container"]}`;    
    createMessage.className = myKeyHash == sender ? `${styles["my-message"]}` : `${styles["your-message"]}`;
    createMessage.innerText = message;
    MessageContainer.appendChild(createMessage);
    showMessage[0].appendChild(MessageContainer);
  };
  return ( 
    <div>
      <div className="chatLog">
        {/* { message ? <Messages /> : null} 이전 메세지 불러오기 아직 구현 완성 X */}
      </div>
      <div className={styles.inputMsg}>
        <TextArea
          rows={4}
          placeholder="입력"
          maxLength={5000}
          value={inputMessage}
          size='large'
          onChange={(e) => setInputMessage(e.target.value)}
        />
      </div>
      <div className={styles.button}>
        <Button
          className="m-3 bg-[#1880ff] font-semibold "
          type="primary"
          onClick={onClick}   
        >
        SEND
        </Button>
      </div>
    </div>
  );
}

export default ChatRoom;
