import React, { useState } from "react";
import { useCustomLogin } from "../../hooks/useCustomLogin";
import { Button } from "antd";
import { CreateProjectModal } from "../../components/ide/CreateProjectModal";
import { ProjectList } from "../../components/ide/ProjectList";

export const MyProjectPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  if (!isLogin) {
    return moveToLoginReturn();
  }

  const showModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  return (
    <>
      <div className="flex">
        <p className="flex justify-start text-2xl font-bold">My Projects</p>
        <div className="grow"></div>
        <div className="flex justify-end">
          <Button
            className="ml-auto bg-[#1880ff] font-semibold"
            type="primary"
            onClick={showModal}
          >
            New
          </Button>
          {isCreateProjectModalOpen ? (
            <CreateProjectModal
              setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
            />
          ) : null}
        </div>
      </div>
      <div className="my-10">
        <ProjectList />
      </div>
    </>
  );
};
