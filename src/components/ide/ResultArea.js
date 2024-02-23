import React from "react";

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
      <div className="p-3 whitespace-pre-line text-justify bg-[#002140] text-white">
        <p className="font-bold">실행 결과</p>
        <p className="mt-2 text-sm">출력 결과</p>
      </div>
    </div>
  );
};
