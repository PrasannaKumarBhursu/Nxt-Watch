import React, { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";
import ThemeContext from "../ThemeContext";

export default class LoginRoute extends Component {
  state = {
    setTheme: false,
    userNameBlur: "",
    passwordBlur: "",
    showPassword: false,
    username: "",
    password: "",
    errorMsg: "",
  };

  onSuccess = (jwt_token) => {
    Cookies.set("jwt_token", jwt_token, { expires: 30 });
    const { history } = this.props;
    history.replace("/");
  };

  onFailure = () => {
    this.setState({
      errorMsg: "*Password and Username did't match",
    });
  };

  blurUserName = (e) => {
    if (e.target.value === "") {
      this.setState({ userNameBlur: "Required*" });
    } else {
      this.setState({ userNameBlur: "" });
    }
  };

  blurPassword = (e) => {
    if (e.target.value === "") {
      this.setState({ passwordBlur: "Required*" });
    } else {
      this.setState({ passwordBlur: "" });
    }
  };

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  passwordHide = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  getDetails = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      console.log(data);
      this.onSuccess(data.jwt_token);
    } else {
      this.onFailure();
    }
  };

  render() {
    const {
      userNameBlur,
      passwordBlur,
      showPassword,
      username,
      password,
      errorMsg,
    } = this.state;
    console.log(showPassword);
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { themeColorStatus, menuBarStatus } = value;
          console.log(themeColorStatus);
          console.log(menuBarStatus);
          return (
            <div
              className={`loginroute__container  bg-${
                themeColorStatus ? "dark" : "light"
              }`}
            >
              <form
                className={`card shadow-lg p-4 bg-${
                  themeColorStatus ? "dark" : "light"
                }`}
                style={{ width: "22rem" }}
                onSubmit={this.getDetails}
              >
                <div className="d-flex justify-content-center p-3">
                  <img
                    src={`${
                      themeColorStatus
                        ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                        : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    }`}
                    style={{ objectFit: "cover" }}
                    className="w-50"
                    alt="next-wave-logo"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className={`form-control text-${
                      themeColorStatus ? "light" : "dark"
                    } bg-${themeColorStatus ? "dark" : "light"}`}
                    onBlur={this.blurUserName}
                    onChange={this.onChangeUserName}
                    value={username}
                  />
                  <p className="text-danger mt-1">{userNameBlur}</p>
                </div>
                <div className="mt-0">
                  <label htmlFor="userpassword">PASSWORD</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="userpassword"
                    className={`form-control text-${
                      themeColorStatus ? "light" : "dark"
                    } bg-${themeColorStatus ? "dark" : "light"}`}
                    onBlur={this.blurPassword}
                    onChange={this.onChangePassword}
                    value={password}
                  />
                  <p className="text-danger mt-1">{passwordBlur}</p>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="mr-2"
                    style={{ height: "15px", width: "15px" }}
                    onClick={() => this.passwordHide()}
                    value={showPassword}
                  />
                  <label
                    htmlFor="showPassword"
                    className={`text-${themeColorStatus ? "light" : "dark"}`}
                  >
                    Show Password
                  </label>
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <button
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "5px" }}
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <p className={`text-danger mt-3`} style={{ fontSize: "1rem" }}>
                  {errorMsg}
                </p>
              </form>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}
