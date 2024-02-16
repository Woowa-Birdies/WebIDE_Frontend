import React from "react";
import { Button, Form, Input, DatePicker, Space } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-enable no-template-curly-in-string */
const onFinish = (values) => {
  console.log(values);
};

export const CreateProjectForm = () => (
  <Form
    {...layout}
    name="create-project"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      name={["project", "name"]}
      label="Project Name"
      rules={[
        {
          required: true,
          message: "프로젝트 이름을 입력해주세요",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={["project", "candidateName"]}
      label="Candidate Name"
      rules={[
        {
          required: true,
          message: "응시자 정보를 입력해주세요",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={["project", "candidateBirthDate"]}
      label="Candidate Birth Date"
      rules={[
        {
          required: true,
          message: "응시자 정보를 입력해주세요",
        },
      ]}
    >
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style="" />
    </Form.Item>
    <Form.Item
      name={["project", "website"]}
      label="Choose the Test"
      rules={[
        {
          required: true,
          message: "문제를 선택해주세요",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
        span: 16,
      }}
    >
      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="default" htmlType="button" onClick={""}>
          Cancel
        </Button>
      </Space>
    </Form.Item>
  </Form>
);
