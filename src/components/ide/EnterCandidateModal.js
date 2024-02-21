import React, { useState, useEffect } from "react";
import jwtAxios from "../../util/jwtUtil";
import { Modal, Button, Form, Input, DatePicker } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const EnterCandidateModal = ({ project }) => {
  const [isEnterCandidateModalOpen, setIsEnterCandidateModalOpen] =
    useState(true);

  useEffect(() => {
    jwtAxios
      .get(`${process.env.REACT_APP_API_SERVER_HOST}/problems`)
      .then((response) => {
        // console.log(response.data);
        setProblemList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showModal = () => {
    setIsEnterCandidateModalOpen(true);
  };

  const closeModal = () => {
    setIsEnterCandidateModalOpen(false);
  };

  const onChange = (value) => {
    console.log("Date Selected : ", value);
  };

  const onSubmit = (value) => {
    console.log("Candidate info: ", value.candidate);
  };

  return (
    <Modal
      title="Enter Your Information"
      open={showModal}
      onCancel={closeModal}
      footer={null} // footer를 비워서 기본 버튼이 사라지게 함
    >
      <Form
        {...layout}
        name="enterCandidate"
        onFinish={onSubmit}
        style={{
          marginRight: 40,
          maxWidth: 600,
        }}
      >
        <Form.Item
          name={["candidate", "name"]}
          label="Candidate Name"
          style={{
            marginTop: 50,
          }}
          rules={[
            {
              required: true,
              message: "이름을 입력하세요",
            },
          ]}
        >
          <Input placeholder="Enter Your Name" />
        </Form.Item>
        <Form.Item
          name={["candidate", "candidateBirthDate"]}
          label="Birth Date"
          style={{
            marginTop: 30,
          }}
          rules={[
            {
              required: true,
              message: "생년월일을 입력하세요",
            },
          ]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
            span: 16,
          }}
        >
          <div className="flex gap-10 mt-5">
            <Button type="default" onClick={closeModal}>
              Cancel
            </Button>
            <Button className="bg-[#1880ff]" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
