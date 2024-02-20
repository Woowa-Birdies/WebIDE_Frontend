import styles from './ChatRoom.module.css';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

// 클라이언트 생성
const Client = new Stomp.Client({
    // SockJS 엔드포인트 URL
    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
   
    // 로그인 자격 정보
    connectHeaders: {
        login: "",
        passcode: "",
        headers: {
            // 'Authorization': `Bearer ${jwtToken}`,  // JWT를 헤더에 추가
            'content-type': 'text/event-stream'
        }
    },
    
    // 통신 로그
    debug: (log) => console.log('STOMP : ', log),
    
    // 연결 성공 시 실행될 콜백 함수
    onConnect: (frame) => {
        // 구독 설정
        Client.subscribe('/sub/chat', (message) => {
            const payload = JSON.parse(message.body);
            console.log('message : ', payload);
        });
    },

    // 연결 실패 시 실행될 콜백 함수
    onStompError: (frame) => {
        console.error('STOMP : ', frame);
    },
});

const onClick = () => {
    Client.publish({
        destination: '/pub/chat',
        body: JSON.stringify('First Message'),  // 임시로 first message 보내서 테스트
    });
}
const active = () => {
    Client.activate();
}

function ChatRoom() {
    return (
        <div>
            <div className={styles.container}>채팅 내용이 보이는 곳</div>
            <button onClick={onClick}>전송</button>
            <button onClick={active}>연결</button>
        </div>
    )
}
export default ChatRoom;