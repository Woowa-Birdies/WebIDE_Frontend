import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import SolarizedLightTheme from "monaco-themes/themes/Solarized-light.json";
import SolarizedDarkTheme from "monaco-themes/themes/Solarized-dark.json";

import styles from "./styles.module.css";
import { IdeTopBar } from "../IDETopBar";

export const CodeEditor = ({ leftWidth, isDarkMode, setIsDarkMode }) => {
  const monaco = useMonaco(); // 사용할 모나코 인스턴스 생성
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: false,
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

  useEffect(() => {
    if (!monaco) return; // 모나코 인스턴스가 null이면 early return

    // 원하는 이름으로 테마를 define
    monaco.editor.defineTheme("solarizedLight", SolarizedLightTheme);
    monaco.editor.defineTheme("solarizedDark", SolarizedDarkTheme);

    // 모나코 에디터에 테마를 적용
    monaco.editor.setTheme("solarizedLight");

    isDarkMode
      ? monaco.editor.setTheme("solarizedDark")
      : monaco.editor.setTheme("solarizedLight");
  }, [monaco, isDarkMode]);

  return (
    <>
      <IdeTopBar />
      <div className={`${styles.codeEditorContainer}`}>
        <Editor
          height={`${topHeigth}%`}
          width="100%"
          defaultLanguage="python"
          defaultValue="// Please enter the code"
          value={code}
          onMount={handleEditorDidMount}
          options={editorOptions}
          // onChange={handleEditorChange}
        />
      </div>
    </>
  );
};
