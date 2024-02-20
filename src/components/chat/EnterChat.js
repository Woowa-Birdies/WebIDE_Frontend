import React, { useState } from "react";
import { Button, Drawer } from "antd";

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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};