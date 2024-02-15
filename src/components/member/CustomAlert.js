import { Alert, Button } from 'antd'
import React from 'react'

export const CustomAlert = (props) => {
  return (
    <>
        <Alert
          message={props.message}
          type="success"
          showIcon
          closable
        />
    </>
  )
}
