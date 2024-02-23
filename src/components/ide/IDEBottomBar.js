import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Chat from "./Chat";
// import Stopwatch from "./Stopwatch";
import { Button } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import { EnterChat } from "../chat/EnterChat";

export const IdeBottomBar = ({ sender, setSender }) => {
  // const navigate = useNavigate();
  // const { uuidParam, questionIdParam } = useParams();
  // const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const showChat = () => {
    setIsChatOpen(true);
  };

  // // IDE로 리다이렉트시 url 파라미터에서 받을 내용
  // const [uuid, setUuid] = useState("");

  // // roomId는 uuid + questionId
  // const [roomId, setRoomId] = useState("");

  // // 채팅방에서 사용할 userName 받아오는 함수
  // const fetchUserName = async () => {
  //   await axios
  //     .get("https://api.hong-sam.online/", { withCredentials: true })
  //     .then((res) => {
  //       if (res.data.status === 400 && sender) {
  //         return;
  //       } else if (res.data.status === 400) {
  //         alert(res.data.data);
  //         navigate(`/${uuidParam}/${questionIdParam}/guest`);
  //       } else if (res.data.status === 200) {
  //         setSender(res.data.data.username);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // // IDE 페이지 진입 시 url로 받아온 Params를 이용하여 RoomId와 uuid를 초기화해준다
  // useEffect(() => {
  //   fetchUserName();
  //   const tmpRoomId = uuidParam + questionIdParam;
  //   setUuid(uuidParam);
  //   setRoomId(tmpRoomId);
  // }, []);

  // const openChat = () => {
  //   isChatOpen ? setIsChatOpen(false) : setIsChatOpen(true);
  // };

  return (
    <>
      <div
        className={
          "flex absolute w-screen bottom-0 border-t z-10 bg-[#001529] text-white"
        }
      >
        <p className="pl-5 pt-3 font-bold">응시자 이름</p>
        <p className="pl-5 pt-3 font-bold">생년월일</p>
        <div className="grow"></div>
        <div className="flex items-center pr-5 pt-2 pb-2">
          <Button
            className="text-white font-semibold"
            type="dashed"
            shape="round"
            onClick={showChat}
          >
            <WechatOutlined />
            CHAT
          </Button>
          {isChatOpen ? <EnterChat setIsChatOpen={setIsChatOpen} /> : null}
        </div>
      </div>
    </>
  );
};
