import React, { useState } from "react";
import jwtAxios from "../../util/jwtUtil";
import { Modal, message } from "antd";
import { ExclamationCircleTwoTone } from "@ant-design/icons";

export const DeleteProjectModal = ({
  setIsDeleteProjectModalOpen,
  selectedProjectId,
  onDeleteProject,
}) => {
  const showModal = () => {
    setIsDeleteProjectModalOpen(true);
  };

  const handleDelete = () => {
    jwtAxios
      .delete(
        `${process.env.REACT_APP_API_SERVER_HOST}/projects/${selectedProjectId}`
      )
      .then((res) => {
        console.log("Response Delete Project : ", res.data);
        // 삭제 완료 메시지 표시
        message.success({
          content: "Project Deleted Successfully",
          duration: 1.5,
        });
        onDeleteProject();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsDeleteProjectModalOpen(false);
  };
  const handleCancel = () => {
    setIsDeleteProjectModalOpen(false);
  };

  return (
    <Modal
      title={
        <span>
          <ExclamationCircleTwoTone className="mr-3" twoToneColor="red" />
          Warning
        </span>
      }
      open={showModal}
      okText="Delete"
      okType="danger"
      onOk={handleDelete}
      cancelText="Cancel"
      onCancel={handleCancel}
    >
      Are You Sure Delete This Project?
    </Modal>
  );
};
