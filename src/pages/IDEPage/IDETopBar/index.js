import React from "react";

export const IdeTopBar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className={`flex items-center fixed w-screen z-10 border-b`}>
      <a href="">
        <p className={`text-2xl pl-5 p-2`}>Woowa IDE</p>
      </a>
      <div className="grow"></div>
      <div className="flex items-center gap-5 pr-5">
        <button onClick={""}>Save</button>
        <button onClick={""}>Run</button>
        <button onClick={""}>Profile</button>
      </div>
    </div>
  );
};
