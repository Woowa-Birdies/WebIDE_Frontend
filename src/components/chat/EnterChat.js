import React, { useState } from "react";
import { Button, Drawer } from "antd";
import ChatRoom from "./ChatRoom";
export const EnterChat = ({ setIsChatOpen }) => {
  const showDrawer = () => {
    setIsChatOpen(true);
  };
  const onClose = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Drawer title="Basic Drawer" onClose={onClose} open={showDrawer}>
        <ChatRoom />
      </Drawer>
    </>
  );
};