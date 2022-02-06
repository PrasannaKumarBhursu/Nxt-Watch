import React, { Component } from "react";
import "./index.css";

export default class VideoCard extends Component {
  render() {
    const { video } = this.props;
    return (
      <>
        <div className="card__container" key={video.id}>
          <div className="card ml-3">
            <img src={video.thumbnail_url} />
            <div className="d-flex mt-3">
              <img
                src={video.channel.profile_image_url}
                style={{ width: "2.5em", height: "2.5em" }}
              />
              <div>
                <p style={{ fontSize: ".9rem" }}>{video.title}</p>
                <div className="d-flex align-items-center">
                  <h1 style={{ fontSize: "0.8rem", marginTop: "0em" }}>
                    {video.channel.name}
                  </h1>
                  <div>
                    <h1
                      style={{ fontSize: ".8rem" }}
                      className="ml-2"
                    >{`${video.view_count} views`}</h1>
                  </div>
                  <div>
                    <h1
                      style={{ fontSize: ".8rem" }}
                      className="ml-2"
                    >{`${video.published_at}`}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
