import React, { Component } from "react";
import MenuBar from "../MenuBar";
import Navbar from "../Navbar";
import GamingRoute from "../GamingRoute";
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
            <GamingRoute />
          </div>
        </div>
      </>
    );
  }
}
