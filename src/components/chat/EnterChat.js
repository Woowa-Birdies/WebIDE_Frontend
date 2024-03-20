import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openChat, closeChat } from "../../redux/reducers/chatSlice";
import { Drawer } from "antd";
import ChatRoom from "./ChatRoom";
export const EnterChat = () => {
  const dispatch = useDispatch();

  const parameters = useParams();
  const showDrawer = () => {
    dispatch(openChat());
  };
  const onClose = () => {
    dispatch(closeChat());
  };

  return (
    <>
      <Drawer title="채팅방" onClose={onClose} open={showDrawer}>
        <ChatRoom parameters={parameters} />
      </Drawer>
    </>
  );
};
