import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export const ProjectURLModal = ({
  setIsProjectURLModalOpen,
  selectedProjectId,
  selectedProjectKeyHash,
  member,
}) => {
  const [projectUrl, setProjectUrl] = useState(
    `${process.env.REACT_APP_REDIRECT_URI}/ide/${member.memberId}/${selectedProjectId}/${selectedProjectKeyHash}`
  );

  const showModal = () => {
    setIsProjectURLModalOpen(true);
  };
  const handleOk = () => {
    setIsProjectURLModalOpen(false);
  };
  const handleCancel = () => {
    setIsProjectURLModalOpen(false);
  };

  const handleCopyClick = () => {
    // URL을 클립보드에 복사하는 함수
    navigator.clipboard.writeText(projectUrl); // 프로젝트 URL을 클립보드에 복사
    message.success("URL Copied to Clipboard"); // 성공 메시지 표시
  };

  return (
    <Modal
      title="Project URL"
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ className: "bg-[#1880ff]" }} // OK 버튼 배경색 변경
    >
      <Input
        className="mt-5 mb-5"
        value={projectUrl} // 프로젝트 URL 표시
        readOnly // 읽기 전용
        addonAfter={<CopyOutlined onClick={handleCopyClick} />}
      />
    </Modal>
  );
};
