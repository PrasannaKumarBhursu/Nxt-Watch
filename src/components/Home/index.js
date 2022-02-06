import React, { Component } from "react";
import MenuBar from "../MenuBar";
import Navbar from "../Navbar";
import HomeRoute from "../HomeRoute";
export default class Home extends Component {
  render() {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <div className="d-flex">
          <div className="d-none d-md-inline">
            <MenuBar />
          </div>
          <div>
            <HomeRoute />
          </div>
        </div>
      </>
    );
  }
}
