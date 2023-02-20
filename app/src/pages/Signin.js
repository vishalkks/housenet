import React, { useState } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Header from "../components/Headers";
import axios from "axios";

const Signin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const label = `${checked ? "Remembered!" : "Remember me"}`;

  const onFinish = (values) => {
    setLoading(true);
    // Perform registration logic here, e.g. API call to backend
    axios
      .post("/api/register", values)
      .then(() => {
        message.success("Registration successful!");
        setLoading(false);
        // history.push("/");
      })
      .catch((error) => {
        message.error("Registration failed. Please try again.");
        setLoading(false);
        console.error(error);
      });
  };

  // const { getFieldDecorator } = this.props.form;
  return (
    <div className="signin">
      <Header />
      <div
        className="signin-form"
        style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
      >
        <h1>Sign in an account</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 4, message: "Username must be at least 4 characters" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password />
            <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
              {label}
            </Checkbox>
            {/* <Button type="primary" size="small" onClick={toggleChecked}>
              {!checked ? "Check" : "Uncheck"}
            </Button> */}
            <Button
              style={{ margin: "0 10px" }}
              type="primary"
              size="small"
              onClick={toggleDisable}
            >
              {!disabled ? "Disable" : "Enable"}
            </Button>
            <a className="login-form-forgot" href="/sign-up">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
