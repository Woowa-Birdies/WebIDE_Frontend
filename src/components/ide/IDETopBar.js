import React from "react";
import { Button, message } from "antd";

export const IdeTopBar = ({ keyHashParam, onSave, onRun }) => {
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
          onClick={() => {
            // keyHashParam이 null이 아니면(= 응시자) 실행, null이면(= 감독관) 실행하지 않음
            if (keyHashParam) {
              onRun();
            } else {
              // 경고 메시지 표시
              message.warning({ content: "감독관은 실행 불가", duration: 1 });
            }
          }}
        >
          <p>RUN</p>
        </Button>
        <Button
          className="bg-[#1880ff] font-semibold"
          type="primary"
          shape="round"
          onClick={() => {
            // keyHashParam이 null이 아니면(= 응시자) 실행, null이면(= 감독관) 실행하지 않음
            if (keyHashParam) {
              onSave();
              // 성공 메시지 표시
              message.success({
                content: "Submitted Successfully",
                duration: 1.5,
              });
            } else {
              // 경고 메시지 표시
              message.warning({
                content: "감독관은 제출 불가",
                duration: 1,
              });
            }
          }}
        >
          <p>SUBMIT</p>
        </Button>
      </div>
    </div>
  );
};
