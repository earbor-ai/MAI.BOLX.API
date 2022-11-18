import React from "react";
import { Field, Form } from "react-final-form";
import { connect } from "react-redux";
// import { Input } from "antd";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Space } from "antd";
import { Alert, Button } from "reactstrap";
import PasswordField from "../form/Password";
import renderCheckBoxField from "../form/CheckBox";

const LogInForm = ({
  onSubmit,
  errorMsg,
  errorMessage,
  loading,
  fieldUser,
  typeFieldUser,
  form,
  setUserName,
  setPassword,
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form className="form login-form" onSubmit={handleSubmit}>
            {errorMessage ? <p style={{ color: 'red', backgroundColor: '#ffffdc', padding: '5px 20px 5px 20px' }}>{errorMessage}</p> : null}
          <div className="form__form-group">
            <span className="form__form-group-label">{fieldUser}</span>
            <Input
              size="small"
              placeholder="enter username"
              onChange={(e) => setUserName(e.target.value)}
              prefix={<UserOutlined />}
              rules={[
                {
                  required: true,
                  message: 'Please enter your usename!',
                },
              ]}
            />
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Password</span>
            <div className="form__form-group-field">
              <Input.Password
                placeholder="enter password"
                size="small"
                prefix={<LockOutlined />}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                rules={[
                  {
                    required: true,
                    message: 'Please enter your password!',
                  },
                ]}
              />
              <div className="account__forgot-password">
                <NavLink to="/reset_password">Forgot a password?</NavLink>
              </div>
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group form__form-group-field">
              <Field
                name="remember_me"
                render={renderCheckBoxField}
                label="Remember me"
                type="checkbox"
              />
            </div>
          </div>

        
          <div className="account__btns">
            {loading ? (
              <Button
                className="account__btn"
                type="button"
                color="primary"
              >
                Signing in ....
              </Button>
            ) : (
              <Button className="account__btn" type="submit" color="primary">
                Sign In
              </Button>
            )}
            <NavLink
              className="btn btn-outline-primary account__btn"
              to="/register"
            >
              Create Account
            </NavLink>
          </div>
        </form>
      )}
    </Form>
  );
};

LogInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  errorMsg: PropTypes.string,
  fieldUser: PropTypes.string,
  typeFieldUser: PropTypes.string,
  form: PropTypes.string.isRequired,
};

LogInForm.defaultProps = {
  errorMessage: "",
  errorMsg: "",
  fieldUser: "Username",
  typeFieldUser: "text",
};

export default connect((state) => ({
  errorMsg: state.user.error,
}))(LogInForm);
