import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import withAuthFirebase from "../../../shared/components/auth/withAuthFirebase";
import LogInForm from "../../../shared/components/loginForm/LogInForm";
import showResults from "../../../utils/showResults";
// const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;

const LogIn = ({ changeIsOpenModalFireBase }) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  console.log(userName, password);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const login = () => {
    if (!userName || !password) {
      setErrorMessage("Please enter username and password");
    } else {
      setErrorMessage(null);
      setLoading(true);
      axios({
        method: "POST",
        url: "http://216.230.74.17:8013/api/Auth/login",
        data: {
          username: userName,
          password: password,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          localStorage.setItem("myToken", response.data.token);
          localStorage.setItem("refreshTok", response.data.refreshToken);
          console.log(response.data.token);
          setLoading(false);
          if (response.data.token) {
            history.push("/select_client");
          }
          if (response.data.status === 400) {
            setErrorMessage("Invalid credentials please check");
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Welcome to
              <span className="account__logo">
                {" "}
                BOLX
                <span className="account__logo-accent">CLIENT</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">
              Start your business easily
            </h4>
          </div>
          <LogInForm
            onSubmit={login}
            setUserName={setUserName}
            setPassword={setPassword}
            form="log_in_form"
            loading={loading}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LogIn);
