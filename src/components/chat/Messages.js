import React, { useCallback, Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { List, Skeleton } from 'antd';
import Message from './Message';

export default function Messages({ projectId = 1 }) {
  const [roomInfo, setRoomInfo] = useState({});
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listContainerRef = useRef(null);

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        //const response = await axios.get(`http://localhost:8080/chat/room/${projectId}`);
        //setRoomId(response.data.roomId);
        //todo : roomId가 없어서 임시로 1로 설정
        const response = {
            projectId: 1,
            roomId: 1,
            admin: {
              userId: 1,
              profileImage: "http://aws.s3/ss/sss.png",
              nickname: "관리자1",
            },
            user: {
              userId: 1212,
              profileImage: "http://aws.s3/xx.png",
              nickname: "구름",
            },
          };
        setRoomInfo(response);
      } catch (error) {
        console.error('방 정보를 불러오는데 실패했습니다.', error);
      }
    };

    fetchRoomInfo();
  }, [projectId]);

  useEffect(() => {
    if (Object.keys(roomInfo).length > 0) {
      // roomInfo가 설정된 후 fetchChats 함수 호출
      fetchChats(1);
    }
  }, [roomInfo]); 

  const fetchChats = async (page) => {
    /*
        if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/chat/fetch', {
        roomId: roomId,
        messageTimeStamp: new Date().toISOString(), // 현재 시점의 ISO 타임스탬프, 실제 사용 시 조정 필요
        page: page,
        size: 3
      });

      // 응답으로 받은 데이터를 처리
      if (response.data && response.data.content) {
        setChats(prevChats => [...prevChats, ...response.data.content]);
        setPage(prevPage => prevPage + 1);
        setHasMore(response.data.content.length > 0); 
      }

      setLoading(false);
    } catch (error) {
      console.error('채팅 데이터를 불러오는 중 에러가 발생했습니다.', error);
      setLoading(false);

    }*/
    if (!loading && hasMore && roomInfo.admin && roomInfo.user) {
      setLoading(true);
      // 더미 데이터 반환 시뮬레이션
      const dummyData = {
        content: [
          {
            messageId: "5f8d04b3eaf7681a30c7f562",
            roomId: 1,
            message: "안녕하세요, 첫 번째 메시지입니다.",
            sender: 1212,
            readUser: { user1: true, user2: false },
            createdAt: "2023-03-01T12:00:00"
          },
          {
            messageId: "5f8d04b4eaf7681a30c7f563",
            roomId: 1,
            message: "이것은 두 번째 메시지입니다.",
            sender: 1,
            readUser: { user1: true, user2: false },
            createdAt: "2023-03-01T12:10:00"
          }
        ],
        last: true
      };
      console.log(roomInfo);
      console.log('dummyData : ', dummyData.content)
      dummyData.content = dummyData.content.map(message => {
        const isAdmin = message.sender === roomInfo.admin.userId;
        const senderNickname = isAdmin ? roomInfo.admin.nickname : roomInfo.user.nickname;
        const profileImage = isAdmin ? roomInfo.admin.profileImage : roomInfo.user.profileImage;
  
        return {
          ...message,
          isAdmin,
          senderNickname,
          profileImage
        };
      });
      console.log('dummyData : ', dummyData.content)

      // 더미 데이터를 상태에 설정
      setChats((prevChats) => [...prevChats, ...dummyData.content]);
      //setChats((prevChats) => [...prevChats, ...response.data.content])
      setHasMore(!dummyData.last);
      setLoading(false);
    }
  };
  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (listContainerRef.current.scrollTop === 0 && !loading) {
        fetchChats();
      }
    };

    const listEl = listContainerRef.current;
    listEl.addEventListener('scroll', handleScroll);

    return () => listEl.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    // 초기 로드 시 스크롤을 맨 아래로 이동
    fetchChats();
    if (listContainerRef.current) {
      const listEl = listContainerRef.current;
      listEl.scrollTop = listEl.scrollHeight;
    }
  }, [chats]);

  /*
  return (
    <div ref={listContainerRef} className="overflow-auto h-full" style={{height: '500px'}}>
      <List 
        dataSource={chats}
        renderItem={(item) => (
          <List.Item key={item.messageId} style={{ borderBottom: 'none' }}>
            <Skeleton avatar title={false} loading={item.loading} active>
              <Message message={item} />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );*/
  function addDateDividers(messages) {
    const enhancedMessages = [];
    let lastDate = null;
  
    messages.forEach((message) => {
      // createdAt 속성의 존재 여부를 확인
      console.log('message : ', message);
      if (message.createdAt) {
        const messageDate = message.createdAt.split('T')[0];
        if (messageDate !== lastDate) {
          enhancedMessages.push({ type: 'dateDivider', date: messageDate });
          lastDate = messageDate;
        }
      }
      enhancedMessages.push({ ...message, type: 'message' });
    });
  
    return enhancedMessages;
  }
  
  return (
    <div ref={listContainerRef} className="overflow-auto h-full" style={{ height: '500px' }}>
      <List
        dataSource={addDateDividers(chats)} // 날짜 구분자가 추가된 메시지 목록
        renderItem={item => {
          // 날짜 구분자 렌더링
          if (item.type === 'dateDivider') {
            return (
              <List.Item style={{ borderBottom: 'none' }}>
                <div className="date-divider text-center py-2 my-2 mx-auto bg-gray-100 text-gray-600 rounded-full w-auto inline-block px-4">
                  {item.date}
                </div>
              </List.Item>
            );
          }
          // 메시지 렌더링
          return (
            <List.Item key={item.messageId} style={{ borderBottom: 'none' }}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <Message message={item} />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </div>
  );
}