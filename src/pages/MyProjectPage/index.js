import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useCustomLogin } from "../../hooks/useCustomLogin";
import { CreateProjectModal } from "../../components/ide/CreateProjectModal";
import { ProjectList } from "../../components/ide/ProjectList";

const initState = {
  memberId: "",
  email: "",
  pwd: "",
  nickname: "",
};

export const MyProjectPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const [member, setMember] = useState(initState);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const loginInfo = useSelector((state) => state.loginSlice);

  useEffect(() => {
    setMember({ ...loginInfo });
  }, [loginInfo]);

  if (!isLogin) {
    return moveToLoginReturn();
  }

  const showCreateProjectModal = () => {
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
            onClick={showCreateProjectModal}
          >
            New
          </Button>
          {isCreateProjectModalOpen ? (
            <CreateProjectModal
              setIsCreateProjectModalOpen={setIsCreateProjectModalOpen}
              member={member}
            />
          ) : null}
        </div>
      </div>
      <div className="my-10">
        <ProjectList member={member} />
      </div>
    </>
  );
};
