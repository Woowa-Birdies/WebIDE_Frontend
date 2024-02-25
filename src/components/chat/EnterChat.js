import React from "react";
import { Drawer } from "antd";
import ChatRoom from "./ChatRoom";
import { useParams } from "react-router-dom";

export const EnterChat = ({ setIsChatOpen }) => {
  const parameters = useParams();
  const showDrawer = () => {
    setIsChatOpen(true);
  };
  const onClose = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Drawer title="채팅방" onClose={onClose} open={showDrawer}>
        <ChatRoom parameters={parameters} />
      </Drawer>
    </>
  );
};
