import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch as Routes,
  Route,
} from "react-router-dom";

import LoginRoute from "./components/LoginRoute";
import ThemeContext from "./components/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Trend from "./components/Trend";
import Home from "./components/Home";
import Game from "./components/Game";

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
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trend" component={Trend} />
            <ProtectedRoute exact path="/game" component={Game} />
          </ThemeContext.Provider>
        </Routes>
      </Router>
    );
  }
}
