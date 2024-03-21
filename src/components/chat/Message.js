// import React from 'react';
// import defaultProfileImg from '../../assets/images/defaultprofile.png';


// const Message = ({ message }) => {
//   // 메시지 생성 날짜 포매팅
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     return `${hours}:${minutes}`;
//   };
//   const handleImgError = (e) => {
//     e.target.src = defaultProfileImg;
//   };
//   return (
//     <div className={`flex w-full items-start ${message.isAdmin ? 'justify-start' : 'justify-end'}`}>
//       <div className="max-w-xs bg-gray-200 p-2 rounded">
//         <img
//           src={message.profileImage || defaultProfileImg}
//           alt="Profile"
//           className="h-8 w-8 rounded-full"
//           onError={handleImgError} // 이미지 로딩 실패 시 onError 이벤트 핸들러를 지정
//         />
//         <div>
//           <p className="text-sm">{message.senderNickname}</p>
//           <p>{message.message}</p>
//         </div>
//         <div className="text-right text-sm text-gray-600">
//           <span>{formatDate(message.createdAt)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;
