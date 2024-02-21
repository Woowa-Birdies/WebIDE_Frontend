import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

const columns = [
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
    render: (text, record) => (
      <Link to={`/projects/${record.key}`}>{text}</Link>
    ),
  },
  {
    title: "Problem Title",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Last Update",
    dataIndex: "lastUpdate",
    key: "lastUpdate",
  },
  {
    title: "Created at",
    dataIndex: "CreatedAt",
    key: "address",
  },
  {
    title: "Created at",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
  },
];

const data = [
  {
    key: "1",
    name: "-",
    age: "-",
    address: "-",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "-",
    age: "-",
    address: "-",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "-",
    age: "-",
    address: "-",
    tags: ["cool", "teacher"],
  },
];

export const ProjectList = ({ member }) => {
  useEffect(() => {
    jwtAxios
      .get(`${process.env.REACT_APP_API_SERVER_HOST}/projects`)
      .then((response) => {
        // console.log(response.data);
        setProblemList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <Table columns={columns} dataSource={data} pagination={false} />;
};
