import React from "react";
import axios from "axios";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const EnterCandidateModal = ({
  setIsEnterCandidateModalOpen,
  projectId,
  onCandidateEnter,
}) => {
  const showModal = () => {
    setIsEnterCandidateModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsEnterCandidateModalOpen(false);
  // };

  const onDateChange = (value) => {
    console.log("Date Selected : ", value);
  };

  const onLanguageChange = (value) => {
    console.log("Language Selected : ", value);
  };

  const onSubmit = (value) => {
    console.log("Candidate Info : ", {
      candidateName: value.candidate.name,
      // birthDate: value.candidate.birthDate.format("yyyy-MM-dd HH:mm:ss"),
      birthDate: `${formatToLocalDateTime(value.candidate.birthDate)}`,
      language: value.candidate.language,
    });

    axios
      .post(`${process.env.REACT_APP_API_SERVER_HOST}/candidate/${projectId}`, {
        candidateName: value.candidate.name,
        birthDate: `${formatToLocalDateTime(value.candidate.birthDate)}`,
        language: value.candidate.language,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          console.log("Request Success.............");
          onCandidateEnter();
          setIsEnterCandidateModalOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatToLocalDateTime(dateTime) {
    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
    const date = new Date(dateTime);
    const localDateTime = new Date(date.getTime() + TIME_ZONE).toISOString();

    return localDateTime;
  }

  return (
    <Modal
      title="Enter Your Information"
      open={showModal}
      // onCancel={closeModal}
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
          name={["candidate", "birthDate"]}
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
          <DatePicker onChange={onDateChange} />
        </Form.Item>
        <Form.Item
          name={["candidate", "language"]}
          label="Select a Language"
          style={{
            marginTop: 30,
          }}
          rules={[
            {
              required: true,
              message: "사용 언어를 선택하세요",
            },
          ]}
        >
          <Select
            // showSearch
            placeholder="Select a Test Language"
            onChange={onLanguageChange}
            options={[
              {
                value: "java",
                label: "Java",
              },
              {
                value: "python",
                label: "Python",
              },
              {
                value: "cpp",
                label: "C++",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
            span: 16,
          }}
        >
          <div className="flex gap-10 mt-5">
            <Button
              type="default"
              // onClick={closeModal}
            >
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
