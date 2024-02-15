import React from "react";
// import styles from "./ResultArea.module.css";

import { ResultTopBar } from "./ResultTopBar";

export const ResultArea = ({ result, topHeigth, handleMouseDown }) => {
  return (
    <div
      // className={`${styles.resultTermContainer} border-t`}
      style={{
        maxHeight: `calc(100% - ${topHeigth}%)`,
      }}
    >
      <div
        className="w-full h-1 cursor-row-resize "
        onMouseDown={handleMouseDown}
      ></div>
      <ResultTopBar />
      <div>
        <p className="pl-5 whitespace-pre-line">
          {result.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};
