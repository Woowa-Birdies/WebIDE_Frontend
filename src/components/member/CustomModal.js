import { Modal } from 'antd';
import React from 'react'

export const CustomModal = ({setModal2Open, modal2Open, handle}) => {

    

    return (
        <Modal
            lineWith='300px'
            width={350}
            title="탈퇴"
            centered
            open={modal2Open}
            cancelText='취소하기'
            okText='탈퇴하기'
            okType='danger'
            onOk={() => {
                setModal2Open(false)
                handle()
            }}
            onCancel={() => setModal2Open(false)}
        >
            <p>탈퇴시 생성했던 프로젝트들도 같이 삭제됩니다.</p>
        </Modal>
    )
}
