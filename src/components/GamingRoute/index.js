import React, { Component } from "react";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import GameCard from "../GameCard";
import "./index.css";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export default class Gaming extends Component {
  state = {
    youtubeVideos: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount() {
    this.getDetails();
  }

  onSuccess = (updatedVideosList) => {
    const { youtubeVideos } = this.state;
    this.setState({ youtubeVideos: updatedVideosList });
  };

  getDetails = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    console.log("its clicked");
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/videos/gaming";
    console.log(url);
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      const updatedVideosList = data.videos;
      this.onSuccess(updatedVideosList);
      this.setState({ apiStatus: apiStatusConstants.success });
      console.log(data);
    }
    if (data.videos.length === 0) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  retryTheFetchCall = () => {
    this.getDetails();
  };

  renderFetchSuccuss = () => {
    const { youtubeVideos } = this.state;
    return (
      <div
        className="mt-0"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        {youtubeVideos.map((video) => (
          <GameCard video={video} key={video.id} />
        ))}
      </div>
    );
  };

  renderLoadingView = () => (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <TailSpin height="75" widht="75" color="blue" ariaLabel="loading" />
    </div>
  );

  renderFetchFailure = () => (
    <div className="failuer__container d-flex justify-content-center align-items-center">
      <div style={{ width: "22rem" }}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          className="w-100 p-3"
          alt="failure-img"
          style={{ objectFit: "cover" }}
        />
        <div className="text-center p-3 pt-0">
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. Please try
            again
          </p>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => this.retryTheFetchCall()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  renderFinalPage = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFetchSuccuss();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFetchFailure();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <div className="d-flex p-4 align-items-center justify-content-center">
          <LocalFireDepartmentIcon color="primary" size="large" />
          <h1 className="ml-4">Gaming</h1>
        </div>
        {this.renderFinalPage()}
      </>
    );
  }
}
