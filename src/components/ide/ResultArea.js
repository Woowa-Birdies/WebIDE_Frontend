import React from "react";
// import styles from "./ResultArea.module.css";

export const ResultArea = ({ result, topHeigth, handleMouseDown }) => {
  return (
    <div
      className="overflow-y-auto border-t"
      style={{
        maxHeight: `calc(100% - ${topHeigth}%)`,
      }}
    >
      <div
        className="w-full h-1 cursor-row-resize"
        onMouseDown={handleMouseDown}
      ></div>
      <div className="bg-[#002140] text-white">
        <p className="p-3 whitespace-pre-line text-justify">
          실행 결과 출력
          {/* {result.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))} */}
        </p>
      </div>
    </div>
  );
};
