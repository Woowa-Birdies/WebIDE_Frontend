import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { ShareAltOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProjectURLModal } from "./ProjectURLModal";
import { DeleteProjectModal } from "./DeleteProjectModal";

export const ProjectList = ({ projectList, member, onDeleteProject }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(""); // 선택된 프로젝트의 keyHash 상태 추가
  const [selectedProjectKeyHash, setSelectedProjectKeyHash] = useState(""); // 선택된 프로젝트의 keyHash 상태 추가
  const [isProjectURLModalOpen, setIsProjectURLModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);

  const showProjectURLModal = (projectId, projectKeyHash) => {
    setSelectedProjectId(projectId);
    setSelectedProjectKeyHash(projectKeyHash);
    setIsProjectURLModalOpen(true);
  };

  const showDeleteProjectModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsDeleteProjectModalOpen(true);
  };

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      align: "center",
      render: (text, record) => (
        <Link
          to={`/ide/${member.memberId}/${record.projectId}`}
          target="_blank"
        >
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Problem Title",
      dataIndex: "problemTitle",
      key: "problemTitle",
      align: "center",
    },
    {
      title: "Candidate",
      dataIndex: "candidate",
      key: "candidate",
      align: "center",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
    },
    {
      title: "URL",
      dataIndex: "projectURL",
      key: "projectURL",
      align: "center",
      render: (text, record) => (
        <Button
          icon={<ShareAltOutlined />}
          onClick={() => showProjectURLModal(record.projectId, record.keyHash)} // showProjectURLModal 함수에 프로젝트의 projectId, keyHash 전달
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render: (text, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => showDeleteProjectModal(record.projectId)}
        />
      ),
    },
  ];

  function formatDateTime(dateTime) {
    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
    const date = new Date(dateTime);
    const formattedDate = new Date(date.getTime() + TIME_ZONE)
      .toISOString()
      .slice(0, 19)
      .replace("T", "\n");

    return formattedDate;
  }

  return (
    <>
      <p className="m-5 italic font-mono font-bold underline decoration-4 underline-offset-8 decoration-sky-500/30">
        * Click The Project Name, Move to IDE *
      </p>
      <Table
        columns={columns}
        dataSource={projectList.map((project) => ({
          projectId: project.projectId,
          projectName: project.projectName,
          problemTitle: project.problemTitle,
          candidate: project.candidateName || "-",
          createdAt: formatDateTime(project.createdAt),
          updatedAt: formatDateTime(project.updatedAt),
          keyHash: project.keyHash,
        }))}
        pagination={false}
      />
      {isProjectURLModalOpen ? (
        <ProjectURLModal
          setIsProjectURLModalOpen={setIsProjectURLModalOpen}
          selectedProjectId={selectedProjectId} // 선택된 프로젝트의 id 전달
          selectedProjectKeyHash={selectedProjectKeyHash} // 선택된 프로젝트의 keyHash 전달
          member={member}
        />
      ) : null}
      {isDeleteProjectModalOpen ? (
        <DeleteProjectModal
          setIsDeleteProjectModalOpen={setIsDeleteProjectModalOpen}
          selectedProjectId={selectedProjectId} // 선택된 프로젝트의 id 전달
          onDeleteProject={onDeleteProject}
        />
      ) : null}
    </>
  );
};
