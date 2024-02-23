import React from "react";
import { Button } from "antd";

export const IdeTopBar = ({ onRun }) => {
  return (
    <div className="flex items-center fixed w-screen z-10 border-b bg-[#001529] text-white">
      <a href="">
        <p className="text-2xl pl-5 p-2">
          <b>Woowa IDE</b>
        </p>
      </a>
      <div className="grow"></div>
      <div className="flex items-center gap-5 pr-5">
        <Button
          className="bg-[#1880ff] font-semibold"
          type="primary"
          shape="round"
          onClick={""}
        >
          <p>SAVE</p>
        </Button>
        <Button
          className="bg-[#1880ff] font-semibold"
          type="primary"
          shape="round"
          onClick={onRun}
        >
          <p>RUN</p>
        </Button>
      </div>
    </div>
  );
};
