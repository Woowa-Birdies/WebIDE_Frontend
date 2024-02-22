import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jwtAxios from "../../util/jwtUtil";
import { IdeTopBar } from "../../components/ide/IDETopBar";
import { QuestionMenu } from "../../components/ide/QuestionMenu";
import { CodeEditor } from "../../components/ide/CodeEditor";
import { IdeBottomBar } from "../../components/ide/IDEBottomBar";
import { useCustomLogin } from "../../hooks/useCustomLogin";
import { EnterCandidateModal } from "../../components/ide/EnterCandidateModal";

export const IDEPage = () => {
  const { memberIdParam, projectIdParam, keyHashParam } = useParams();
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const [isEnterCandidateModalOpen, setIsEnterCandidateModalOpen] =
    useState(false);

  if (!isLogin && !keyHashParam) {
    // 로그인되어 있지 않고 keyHashParam도 존재하지 않는 경우 로그인 창으로 이동
    return moveToLoginReturn();
  }

  useEffect(() => {
    if (!isLogin && keyHashParam) {
      // 로그인되어 있지 않고 keyHashParam은 존재하는 경우 모달 오픈
      setIsEnterCandidateModalOpen(true);
    }
  }, [isLogin, keyHashParam]);

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
    <div>
      <IdeTopBar />
      <div>
        <QuestionMenu leftWidth={leftWidth} handleMouseDown={handleMouseDown} />
        <CodeEditor leftWidth={leftWidth} />
      </div>
      <IdeBottomBar sender={sender} setSender={setSender} />
      {isEnterCandidateModalOpen ? (
        <EnterCandidateModal
          setIsEnterCandidateModalOpen={setIsEnterCandidateModalOpen}
          projectId={projectIdParam}
          // keyHash={keyHashParam} // 선택된 프로젝트의 keyHash 전달
        />
      ) : null}
    </div>
  );
};
