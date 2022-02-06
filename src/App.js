import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
} from "react-router-dom";

import LoginRoute from "./components/LoginRoute";
import HomeRoute from "./components/HomeRoute";
import ThemeContext from "./components/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

export class App extends Component {
  state = {
    themeColorStatus: false,
    menuBarStatus: false,
  };

  onThemeChange = (val) => {
    const { themeColorStatus } = this.state;
    this.setState({ themeColorStatus: val });
  };

  onMenuBarChange = (val) => {
    const { menuBarStatus } = this.state;
    this.setState({ menuBarStatus: val });
  };

  render() {
    const { themeColorStatus, menuBarStatus } = this.state;
    return (
      <Router>
        <Routes>
          <ThemeContext.Provider
            value={{
              themeColorStatus,
              menuBarStatus,
              onMenuBarChange: this.onMenuBarChange,
              onThemeChange: this.onThemeChange,
            }}
          >
            <Route exact path="/login" component={LoginRoute} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
          </ThemeContext.Provider>
        </Routes>
      </Router>
    );
  }
}
