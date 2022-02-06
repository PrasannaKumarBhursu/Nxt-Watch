import React, { Component } from "react";
import Navbar from "../Navbar";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";
import VideoCard from "../VideoCard";
import { TailSpin } from "react-loader-spinner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export default class HomeRoute extends Component {
  state = {
    showBanner: true,
    searchValue: " ",
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
    const { searchValue } = this.state;
    console.log(searchValue);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/videos/all?search=${searchValue}`;
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

  onClickEnter = (e) => {
    if (e.key === "Enter") {
      this.getDetails();
    }
  };

  removeBanner = () => {
    this.setState({ showBanner: false });
  };

  searchValueUpdated = (e) => {
    const inputValue = e.target.value;
    this.setState({ searchValue: inputValue });
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
        }}
      >
        {youtubeVideos.map((video) => (
          <VideoCard video={video} key={video.id} />
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
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="w-100 p-3"
          style={{ objectFit: "cover" }}
        />
        <div className="text-center p-3 pt-0">
          <h1>No Search results found</h1>
          <p>Try different key words or remove search filter</p>
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
    const { showBanner, searchValue } = this.state;

    return (
      <>
        <div>
          <Navbar />
        </div>
        {showBanner && (
          <div className="p-4 img__container">
            <CloseIcon
              className="d-block"
              style={{ float: "right", marginBottom: "3rem" }}
              onClick={() => this.removeBanner()}
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="mt-3"
              style={{ maxWidth: "13rem" }}
              alt="img-banner"
            />
            <p className="mt-3">Buy Nxt Watch Premium prepaid plans with UPI</p>
            <div>
              <button className="Btn mt-3">GET IT NOW</button>
            </div>
          </div>
        )}
        <div className="pl-4 pr-4 searchbar__container mt-2">
          <input
            type="search"
            className="search__input p-2 form-control text-primary"
            placeholder="Search"
            onChange={this.searchValueUpdated}
            value={searchValue}
            onKeyDown={this.onClickEnter}
          />
          <div>
            <SearchIcon
              className="search__icon"
              style={{ fontSize: "40px", padding: "0.5rem" }}
              type="submit"
              onClick={() => this.getDetails()}
            />
          </div>
        </div>
        {this.renderFinalPage()}
      </>
    );
  }
}
