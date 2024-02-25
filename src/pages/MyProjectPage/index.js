import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwtAxios from "../../util/jwtUtil";
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
  const [member, setMember] = useState(initState);
  const [projectList, setProjectList] = useState([]);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const { isLogin, moveToLoginReturn } = useCustomLogin();
  const loginInfo = useSelector((state) => state.loginSlice);

  useEffect(() => {
    setMember({ ...loginInfo });
  }, [loginInfo]);

  if (!isLogin) {
    return moveToLoginReturn();
  }

  useEffect(() => {
    fetchProjectList();
  }, [member.memberId]);

  const fetchProjectList = () => {
    jwtAxios
      .get(
        `${process.env.REACT_APP_API_SERVER_HOST}/projects/${member.memberId}`
      )
      .then((res) => {
        console.log("Response Project List : ", res.data);
        setProjectList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCreateProjectModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  const handleProjectCreated = () => {
    fetchProjectList();
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
              onCreateProject={handleProjectCreated}
            />
          ) : null}
        </div>
      </div>
      <div className="my-10">
        <ProjectList projectList={projectList} member={member} />
      </div>
    </>
  );
};
