import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import { EnterChat } from "../chat/EnterChat";
import { openChat } from "../../redux/reducers/chatSlice";

export const IdeBottomBar = ({ project }) => {
  const isChatOpen = useSelector((state) => state.chat.isChatOpen);
  const dispatch = useDispatch();

  const showChat = () => {
    dispatch(openChat());
  };

  function formatDate(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // 월과 일이 한 자리 수일 경우 앞에 0을 추가
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div
        className={
          "flex absolute w-screen bottom-0 border-t z-10 bg-[#001529] text-white"
        }
      >
        <div className="flex space-x-3 pl-5 pt-3">
          <div className="font-bold">응시자</div>
          <div>{project.candidateName}</div>
          <div className="font-bold">생년월일</div>
          <div>{formatDate(project.birthDate)}</div>
        </div>
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
          {isChatOpen ? <EnterChat /> : null}
        </div>
      </div>
    </>
  );
};
