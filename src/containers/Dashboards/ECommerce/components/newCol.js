import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const NewColForm = ({ setCoulmnName, addNewCol }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    setCoulmnName(values?.columnName);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={addNewCol}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Column Name"
          name="columnName"
          rules={[
            {
              required: true,
              message: "Please add a Column Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewColForm;
