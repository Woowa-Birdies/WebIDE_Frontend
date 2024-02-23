import React from "react";
import { Modal } from "antd";

export const CustomModal = ({ setModal2Open, modal2Open, handle }) => {
  return (
    <Modal
      lineWith="300px"
      width={400}
      title="탈퇴"
      centered
      open={modal2Open}
      cancelText="취소"
      okText="탈퇴"
      okType="danger"
      onOk={() => {
        setModal2Open(false);
        handle();
      }}
      onCancel={() => setModal2Open(false)}
    >
      <p className="m-5">탈퇴 시 생성했던 프로젝트들도 같이 삭제됩니다.</p>
    </Modal>
  );
};
