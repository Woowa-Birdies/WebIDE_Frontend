import React, { useEffect, useState } from "react";
import styles from "./QuestionMenu.module.css";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

export const QuestionMenu = ({ projectInfo, leftWidth, handleMouseDown }) => {
  return (
    <div
      className={`${styles.questionMenuContainer} flex`}
      style={{
        width: `${leftWidth}%`,
      }}
    >
      <div className={`overflow-y-scroll w-full border-r`}>
        <div className={`text-3xl p-5 border-b`}>
          <ReactMarkDown remarkPlugins={[remarkGfm]}>
            {projectInfo.title}
          </ReactMarkDown>
        </div>
        <div className="p-5 border-b">
          <p className="text-lg mb-3">{projectInfo.problem}</p>
        </div>
      </div>
      <div
        className="w-1 cursor-col-resize"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};
