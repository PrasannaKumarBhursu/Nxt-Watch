import React, { Component } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { withRouter } from "react-router-dom";
import "./index.css";
import { MdHistoryEdu } from "react-icons/md";

export const menuBar = [
  {
    id: 1,
    iconName: "Home",
    icon: `HomeIcon`,
  },
  {
    id: 2,
    iconName: "Trending",
    icon: `TrendingUpIcon`,
  },
  {
    id: 3,
    iconName: "Gaming",
    icon: `SportsEsportsIcon`,
  },
  {
    id: 4,
    iconName: "Saved Videos",
    icon: `BookmarkAddIcon`,
  },
];

class MenuBar extends Component {
  redirectToTrending = () => {
    const { history } = this.props;
    history.replace("/trend");
  };

  redirectToHome = () => {
    const { history } = this.props;
    history.replace("/");
  };

  redirectTogame = () => {
    const { history } = this.props;
    history.replace("/game");
  };

  render() {
    return (
      <div
        style={{ Width: "25em" }}
        className="d-flex flex-column justify-content-start menubar__container"
      >
        <div className="W-100 ml-4 mr-4">
          <div
            className="d-flex align-items-center"
            onClick={() => this.redirectToHome()}
            style={{ cursor: "pointer" }}
          >
            <HomeIcon />
            <h1 className="ml-3" style={{ fontSize: "1.1rem" }}>
              Home
            </h1>
          </div>
          <div
            className="d-flex align-items-center"
            onClick={() => this.redirectToTrending()}
            style={{ cursor: "pointer" }}
          >
            <TrendingUpIcon />
            <h1 className="ml-3" style={{ fontSize: "1.2rem" }}>
              Trending
            </h1>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => this.redirectTogame()}
          >
            <SportsEsportsIcon />
            <h1 className="ml-3" style={{ fontSize: "1.2rem" }}>
              Gaming
            </h1>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
            <BookmarkAddIcon />
            <h1 className="ml-3" style={{ fontSize: "1.2rem" }}>
              Saved Videos
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MenuBar);
