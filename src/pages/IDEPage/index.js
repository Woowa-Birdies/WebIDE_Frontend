import React, { useEffect, useState } from "react";
import { IdeTopBar } from "../../components/ide/IDETopBar";
import { QuestionMenu } from "../../components/ide/QuestionMenu";
import { CodeEditor } from "../../components/ide/CodeEditor";
import { IdeBottomBar } from "../../components/ide/IDEBottomBar";
import { useCustomLogin } from "../../hooks/useCustomLogin";

export const IDEPage = () => {
  // const { isLogin, moveToLoginReturn } = useCustomLogin();

  // if (!isLogin) {
  //   return moveToLoginReturn();
  // }

  const [leftWidth, setLeftWidth] = useState(30); // 초기 왼쪽 너비 설정
  const [isResizing, setIsResizing] = useState(false);
  const [sender, setSender] = useState("");

  useEffect(() => {
    const handleResize = (e) => {
      if (!isResizing) return;
      const totalWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / totalWidth) * 100;
      setLeftWidth(newLeftWidth);
      // const newRightWidth = 100 - newLeftWidth;
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <div className>
      <IdeTopBar />
      <div>
        <QuestionMenu leftWidth={leftWidth} handleMouseDown={handleMouseDown} />
        <CodeEditor leftWidth={leftWidth} />
      </div>
      <IdeBottomBar sender={sender} setSender={setSender} />
    </div>
  );
};
