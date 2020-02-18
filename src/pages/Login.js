import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import Alpaca from '../imgs/Group 33.png';

// Redux
import { connect } from "react-redux";

// Actions
import { loginUser, setError, clearError } from "../redux/actions/userActions";

// Components
import { Layout, Form, Icon, Input, Button, Checkbox, Alert, Row, Col } from "antd";

// Styles
import "../components/profile/tempStyles.css";

const { Sider, Content } = Layout;

const emailLoginSchema = yup.object().shape({
  email: yup.string().email(),
});

const Login = (props) => {
  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: "",
  });

  let history = useHistory();

  //Redirect if logged already logged in OR on successful registration
  useEffect(() => {
    if (props.isLogged) {
      props.clearError();
      history.push("/user-dashboard");
    }
  }, [props.isLogged]);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
  };

  const submitLogin = (e) => {
    e.preventDefault();

    const userCredentials = user;

    emailLoginSchema
      .validate({ email: user.usernameOrEmail })
      .then(() => {
        userCredentials.method = "email";

        props.loginUser(userCredentials);
      })
      .catch(() => {
        userCredentials.method = "username";

        props.loginUser(userCredentials);
      });

    setUser({ usernameOrEmail: "", password: "" });
  };

  return (
    <Row className="auth-page">
      <Col xs={2} sm={4} md={6} lg={6} xl={8} className="auth-sider">
        <img alt="Alpaca Vids Logo" src={Alpaca}></img>
      </Col>
        <Col xl={16} className="auth-main">
        <span>
            Not a Member? <Link to="/register">Register here</Link>
          </span>
          <div className="auth-content">
          <h1>Welcome Back!</h1>
          <p>Please sign in</p>
        {props.error ? <Alert message={props.error} type="error" /> : null}
        <Form onSubmit={submitLogin} className="login-form" data-testid="login-form">
        <Form.Item label="Username or Email"labelAlign="left">
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.5)" }} />}
              type="text"
              name="usernameOrEmail"
              value={user.usernameOrEmail}
              onChange={handleInput}
              placeholder="Username or Email"
              autoComplete="off"
              required
            />
          </Form.Item>
          <Form.Item label="Password"labelAlign="left">
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.5)" }} />}
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Password"
              autoComplete="off"
              required
            />
          </Form.Item>
          <Form.Item>
            {/* <Checkbox>Remember me</Checkbox> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        </div>
        </Col>
      </Row>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.User.isLogged,
  error: state.User.error,
});

const mapActionsToProps = {
  loginUser,
  setError,
  clearError,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);