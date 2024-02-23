import React from 'react';

const Message = ({ message }) => {
  // 메시지 생성 날짜 포매팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };
  /*
  return (
    <div className="border-b border-gray-200 p-4 flex flex-col">
      <div className="flex items-center mb-2">
        <h5 className="font-bold">{message.senderNickname}</h5>
      </div>
      <div className="mb-2">
        <p>{message.message}</p>
      </div>
      <div className="text-right text-sm text-gray-600">
        <span>{formatDate(message.createAt)}</span>
      </div>
    </div>
  );*/
  return (
    <div className={`flex w-full items-start ${message.isAdmin ? 'justify-start' : 'justify-end'}`}>
      <div className="max-w-xs bg-gray-200 p-2 rounded">
        {/* 프로필 이미지와 메시지 내용을 여기에 렌더링 */}
        <img src={message.profileImage} alt="Profile" className="h-8 w-8 rounded-full"/>
        <div>
          <p className="text-sm">{message.senderNickname}</p>
          <p>{message.message}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <span>{formatDate(message.createAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
