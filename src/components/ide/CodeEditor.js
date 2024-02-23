import React, { useEffect, useRef, useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import NightOwlTheme from "monaco-themes/themes/Night Owl.json";
import CobaltTheme from "monaco-themes/themes/Cobalt.json";
import BlackboardTheme from "monaco-themes/themes/Blackboard.json";
import GitHubDarkTheme from "monaco-themes/themes/GitHub Dark.json";
import TomorrowNightTheme from "monaco-themes/themes/Tomorrow-Night.json";
import OceanicNextTheme from "monaco-themes/themes/Oceanic Next.json";

import styles from "./CodeEditor.module.css";
import { ResultArea } from "./ResultArea";

export const CodeEditor = ({ leftWidth }) => {
  const monaco = useMonaco(); // 사용할 모나코 인스턴스 생성
  const editorRef = useRef(null);
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
      // const newBottomHeigth = 100 - newTopHeigth;
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

    const initializeEditor = () => {
      // 원하는 이름으로 테마를 define
      monaco.editor.defineTheme("nightOwl", NightOwlTheme);
      monaco.editor.defineTheme("cobalt", CobaltTheme);
      monaco.editor.defineTheme("blackboard", BlackboardTheme);
      monaco.editor.defineTheme("gitHubDark", GitHubDarkTheme);
      monaco.editor.defineTheme("tomorrowNight", TomorrowNightTheme);
      monaco.editor.defineTheme("oceanicNext", OceanicNextTheme);

      // 모나코 에디터에 테마를 적용
      monaco.editor.setTheme("nightOwl");
    };

    const timeoutId = setTimeout(initializeEditor, 100); // 100ms 후에 테마 설정

    return () => clearTimeout(timeoutId); // cleanup 함수에서 timeout 제거
  }, [monaco]);

  return (
    <>
      <div
        className={`${styles.codeEditorContainer} bg-[#002140]`}
        style={{
          width: `${100 - leftWidth}%`,
        }}
      >
        <Editor
          height={`${topHeigth}%`}
          width="100%"
          defaultLanguage="java"
          defaultValue="# Please enter the code"
          value={code}
          onMount={handleEditorDidMount}
          options={editorOptions}
          // onChange={handleEditorChange}
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
