import React from "react";
import { Modal, Button, Form, Input, Space } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const CreateProjectModal = ({ setIsCreateProjectModalOpen }) => {
  const closeModal = () => {
    setIsCreateProjectModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    setIsCreateProjectModalOpen(false);
  };

  return (
    <Modal
      title="Create Live Coding Test"
      open={true}
      onCancel={closeModal}
      footer={null} // footer를 비워서 기본 버튼이 사라지게 함
    >
      <Form
        {...layout}
        name="create-project"
        onFinish={onFinish}
        style={{
          marginRight: 20,
          maxWidth: 600,
        }}
      >
        <Form.Item
          name={["project", "name"]}
          label="Project Name"
          style={{
            marginTop: 50,
          }}
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
          name={["project", "website"]}
          label="Choose the Test"
          style={{
            marginTop: 30,
          }}
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
          <div className="flex gap-10 mt-5">
            <Button className="bg-[#1880ff]" type="primary" htmlType="submit">
              Create
            </Button>
            <Button type="default" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
