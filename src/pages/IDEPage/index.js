import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QuestionMenu } from "../../components/ide/QuestionMenu";
import { CodeEditor } from "../../components/ide/CodeEditor";
import { IdeBottomBar } from "../../components/ide/IDEBottomBar";
import { useCustomLogin } from "../../hooks/useCustomLogin";
import { EnterCandidateModal } from "../../components/ide/EnterCandidateModal";

export const IDEPage = () => {
  const { memberIdParam, projectIdParam, keyHashParam } = useParams();
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const [project, setProject] = useState("");
  const [isEnterCandidateModalOpen, setIsEnterCandidateModalOpen] =
    useState(false);

  if (!isLogin && !keyHashParam) {
    // 로그인되어 있지 않고 keyHashParam도 존재하지 않는 경우 로그인 창으로 이동
    return moveToLoginReturn();
  }

  useEffect(() => {
    if (!isLogin && keyHashParam) {
      // 로그인되어 있지 않고 keyHashParam은 존재하는 경우
      if (!project || project.candidateName === null) {
        console.log(project && project.candidateName);
        // 응시자 정보가 없으면 모달 Open
        setIsEnterCandidateModalOpen(true);
      } else {
        // 응시자 정보가 있으면 모달 Close
        setIsEnterCandidateModalOpen(false);
      }
    }
  }, [isLogin, keyHashParam, project]);

  const fetchProject = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_SERVER_HOST}/ide/${memberIdParam}/${projectIdParam}`
      )
      .then((res) => {
        console.log("Response Project : ", res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProject();
  }, [memberIdParam, projectIdParam]);

  const handleCandidateEntered = () => {
    fetchProject();
  };

  const [leftWidth, setLeftWidth] = useState(30); // 초기 왼쪽 너비 설정
  const [isResizing, setIsResizing] = useState(false);

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
      <div>
        <QuestionMenu
          project={project}
          leftWidth={leftWidth}
          handleMouseDown={handleMouseDown}
        />
        <CodeEditor project={project} leftWidth={leftWidth} />
      </div>
      <IdeBottomBar project={project} />
      {isEnterCandidateModalOpen ? (
        <EnterCandidateModal
          setIsEnterCandidateModalOpen={setIsEnterCandidateModalOpen}
          projectId={project.projectId}
          onCandidateEnter={handleCandidateEntered}
        />
      ) : null}
    </div>
  );
};
