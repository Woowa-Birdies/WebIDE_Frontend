import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Editor, { useMonaco } from "@monaco-editor/react";
import NightOwlTheme from "monaco-themes/themes/Night Owl.json";
import CobaltTheme from "monaco-themes/themes/Cobalt.json";
import BlackboardTheme from "monaco-themes/themes/Blackboard.json";
import GitHubDarkTheme from "monaco-themes/themes/GitHub Dark.json";
import TomorrowNightTheme from "monaco-themes/themes/Tomorrow-Night.json";
import OceanicNextTheme from "monaco-themes/themes/Oceanic Next.json";

import styles from "./CodeEditor.module.css";
import { message } from "antd";
import { IdeTopBar } from "./IDETopBar";
import { ResultArea } from "./ResultArea";

export const CodeEditor = ({ project, leftWidth }) => {
  const { keyHashParam } = useParams();
  const monaco = useMonaco(); // 사용할 모나코 인스턴스 생성
  const editorRef = useRef(null);
  const [defaultAnnotation, setDefaultAnnotation] = useState(
    "응시자가 언어를 설정하지 않았습니다.\n"
  );
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: true,
    },
    suggest: {
      // 자동완성 제안 활성화
      snippetsPreventQuickSuggestions: false,
      suggestions: [],
    },
    padding: {
      top: 10,
      bottom: 10,
      left: 20,
      right: 20,
    },
    tabSize: 2,
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const [topHeigth, setTopHeigth] = useState(80);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleResize = (e) => {
      if (!isResizing) return;
      const totalHeigth = window.innerHeight;
      const newTopHeigth = (e.clientY / totalHeigth) * 100;
      setTopHeigth(newTopHeigth);
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

  useEffect(() => {
    if (!monaco) return; // 모나코 인스턴스가 null이면 early return

    // Editor 초기화
    const initializeEditor = () => {
      // 원하는 이름으로 모나코 Editor 테마를 define
      monaco.editor.defineTheme("nightOwl", NightOwlTheme);
      monaco.editor.defineTheme("cobalt", CobaltTheme);
      monaco.editor.defineTheme("blackboard", BlackboardTheme);
      monaco.editor.defineTheme("gitHubDark", GitHubDarkTheme);
      monaco.editor.defineTheme("tomorrowNight", TomorrowNightTheme);
      monaco.editor.defineTheme("oceanicNext", OceanicNextTheme);

      // 모나코 Editor에 테마 적용
      monaco.editor.setTheme("nightOwl");
    };

    const timeoutId = setTimeout(initializeEditor, 100); // 100ms 후에 테마 설정

    return () => clearTimeout(timeoutId); // cleanup 함수에서 timeout 제거
  }, [monaco]);

  useEffect(() => {
    // 언어 문법에 따라 default 주석을 다르게 적용
    switch (project.language) {
      case "JAVA":
      case "CPP":
        setDefaultAnnotation("// Please enter the code\n");
        break;
      case "PYTHON":
        setDefaultAnnotation("# Please enter the code\n");
        break;
    }
  }, [project.language]);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    // keyHashParam이 null이면(= 감독관이면) 실행하지 않음
    if (!keyHashParam) {
      message.warning({ content: "감독관은 실행 불가", duration: 1 }); // 경고 메시지 표시
      return;
    }

    setCode(editorRef.current.getValue());
    // console.log(code);

    setResult("코드 컴파일 진행 중 ...");
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER_HOST}/ide/${project.projectId}/result`,
        {
          language: project.language,
          code: code,
        }
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Response Run Code Result : ", res.data);
          setResult(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveCode = () => {
    // keyHashParam이 null이면(= 감독관이면) 실행하지 않음
    if (!keyHashParam) {
      message.warning({ content: "감독관은 저장 불가", duration: 1 }); // 경고 메시지 표시
      return;
    }

    setCode(editorRef.current.getValue());
    // console.log(code);

    // setResult("코드 저장 진행 중 ...");
    axios
      .patch(
        `${process.env.REACT_APP_API_SERVER_HOST}/ide/${project.projectId}/save`,
        {
          language: project.language,
          code: code,
        }
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Response Save Succeed : ", res.data);
          // setResult("저장 되었습니다.");
          message.success({ content: "Save Succeed", duration: 1 }); // 성공 메시지 표시
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const formatCode = (res) => {
  //   // JSON 파싱을 통해 객체로 변환
  //   const obj = JSON.parse(res);

  //   let result = "";
  //   for (const key in obj) {
  //     result += obj[key] + "\n";
  //   }
  //   return result;
  // };

  console.log(project.language ? project.language.toLowerCase() : "none");
  return (
    <>
      <IdeTopBar onRun={runCode} onSave={saveCode} />
      <div
        className={`${styles.codeEditorContainer} bg-[#002140]`}
        style={{
          width: `${100 - leftWidth}%`,
        }}
      >
        <Editor
          height={`${topHeigth}%`}
          width="100%"
          options={editorOptions}
          defaultLanguage={
            project.language ? project.language.toLowerCase() : ""
          }
          language={project.language ? project.language.toLowerCase() : ""}
          defaultValue={project.code ? project.code : defaultAnnotation}
          value={project.code ? project.code : defaultAnnotation}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          readOnly={!keyHashParam} // keyHashParam이 null이면(= 감독관이면) readOnly를 true로 설정하여 편집 비활성화
        />
        <ResultArea
          result={result}
          topHeigth={`${topHeigth}`}
          handleMouseDown={handleMouseDown}
        />
      </div>
    </>
  );
};
