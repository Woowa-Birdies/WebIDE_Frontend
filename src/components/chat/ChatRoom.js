import styles from "./ChatRoom.module.css";
import * as Stomp from "@stomp/stompjs";
import { useSelector } from "react-redux";
import * as SockJS from "sockjs-client";

function ChatRoom() {
  const jwtToken = useSelector((state) => state.loginSlice.accessToken);
  console.log("jwt token", jwtToken);
  // 클라이언트 생성
  const Client = new Stomp.Client({
    // SockJS 엔드포인트 URL
    // webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    // webSocketFactory: () => new WebSocket('ws://localhost:8080/ws'),
    brokerURL: "ws://localhost:8080/ws",
    // 로그인 자격 정보
    connectHeaders: {
      login: "",
      passcode: "",
      headers: {
        Authorization: `Bearer ${jwtToken}`, // JWT를 헤더에 추가
        "content-type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    },

    // 통신 로그
    debug: (log) => console.log("STOMP : ", log),

    // 연결 성공 시 실행될 콜백 함수
    onConnect: (frame) => {
      // 구독 설정
      Client.subscribe(
        "/queue/chat",
        (message) => {
          const payload = JSON.parse(message.body);
          console.log("message : ", payload);
        }
        // {
        //     Authorization: `Bearer ${jwtToken}`,  // JWT를 헤더에 추가
        //     'content-type': 'text/event-stream'
        // }
      );
    },

    // 연결 실패 시 실행될 콜백 함수
    onStompError: (frame) => {
      console.error("STOMP : ", frame);
    },
  });
  const onClick = () => {
    console.log("success");
    Client.publish({
      destination: "/pub/chat",
      body: JSON.stringify("First Message"), // 임시로 first message 보내서 테스트
    });
  };
  const active = () => {
    Client.activate();
    console.log("client :", Client);
  };
  return (
    <div>
      <div className={styles.container}>채팅 내용이 보이는 곳</div>
      <button onClick={onClick}>전송</button>
      <button onClick={active}>연결</button>
    </div>
  );
}
export default ChatRoom;
