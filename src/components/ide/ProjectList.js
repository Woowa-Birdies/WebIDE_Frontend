import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwtAxios from "../../util/jwtUtil";
import { Button, Table } from "antd";
import { ShareAltOutlined, FormOutlined } from "@ant-design/icons";
import { ProjectURLModal } from "./ProjectURLModal";

export const ProjectList = ({ member }) => {
  const [projectList, setProjectList] = useState([]);
  const [isProjectURLModalOpen, setIsProjectURLModalOpen] = useState(false);

  const showModal = () => {
    setIsProjectURLModalOpen(true);
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
        <Button icon={<ShareAltOutlined />} onClick={showModal} />
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      render: (text, record) => <Button icon={<FormOutlined />} href="" />,
    },
  ];

  useEffect(() => {
    jwtAxios
      .get(
        `${process.env.REACT_APP_API_SERVER_HOST}/projects/${member.memberId}`
      )
      .then((response) => {
        console.log(response.data);
        setProjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [member.memberId]);

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
          candidate: project.candidateName,
          createdAt: formatDateTime(project.createdAt),
          updatedAt: formatDateTime(project.updatedAt),
        }))}
        pagination={false}
      />
      {isProjectURLModalOpen ? (
        <ProjectURLModal
          setIsProjectURLModalOpen={setIsProjectURLModalOpen}
          member={member}
        />
      ) : null}
    </>
  );
};
