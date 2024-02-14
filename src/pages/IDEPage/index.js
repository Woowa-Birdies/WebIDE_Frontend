import React, { useEffect, useState } from "react";
import { FileTree } from "./FileTree";
import { Terminal } from "./Terminal";
import { CodeEditor } from "./CodeEditor";
import { useCustomLogin } from '../../hooks/useCustomLogin'

export const IDEPage = () => {
  
  const {isLogin, moveToLoginReturn} = useCustomLogin()

  if(!isLogin) {
    return moveToLoginReturn()
  }
  
  const [leftWidth, setLeftWidth] = useState(30); // 초기 왼쪽 너비 설정
  const [isResizing, setIsResizing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    <div>
      {/* <Terminal />
      <FileTree /> */}
      <CodeEditor
        leftWidth={leftWidth}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </div>
  );
};
