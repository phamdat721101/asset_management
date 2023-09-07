import React, { Component } from "react";

import Header from "./view/Header";
import axios from "axios";
import Footer from "./view/Footer";
import image from "./../photos/download.png";

class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterName: this.props.match.params.chapterName,
      assets: [],
      error: "",
      status: true,
      auth_wallet: localStorage.getItem("auth_wallet")
    };

    this.exploreAssetclicked = this.exploreAssetclicked.bind(this);
    this.updateButtonClicked = this.updateButtonClicked.bind(this);
    this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("role") == 1) {
      this.setState({
        status: false
      });
    }
    sessionStorage.setItem("url", window.location.pathname);
    const SERVICE_API_URL = "http://localhost:3002/api";

    let auth_key = localStorage.getItem("auth_Key");
    if (auth_key) {
      axios
        .get(`${SERVICE_API_URL}/assets/${this.state.chapterName}`)
        .then(response => {
          console.log("Asset resp: ", response.data)
          this.setState({
            assets: response.data
          });
        })
        .catch(err => {
          this.setState({
            error: err
          });
          console.log(err.message);
        });
    } else {
      this.props.history.push("/");
    }
  }

  updateButtonClicked(assetId, chapterName) {
    this.props.history.push(`/api/update/${chapterName}/${assetId}`);
  }

  exploreAssetclicked(assetId, chapterName) {
    // console.log(assetId, chapterName);
    this.props.history.push(`/api/assetDisplay/${chapterName}/${assetId}`);
  }

  deleteButtonClicked(assetId) {
    const SERVICE_API_URL = "http://localhost:3002/api";
    axios.delete(`${SERVICE_API_URL}/deleteAsset/${assetId}`).then(response => {
      console.log(response);
      window.location.reload();
    });
  }

  addAssetClicked(assetId, chapterName) {
    this.props.history.push(`/api/update/${chapterName}/${assetId}`);
  }

  render() {
    let auth_wallet = localStorage.getItem("auth_wallet")
    console.log("Auth wallet: ", localStorage.getItem("auth_wallet"))

    if(!auth_wallet || auth_wallet.length <= 0){
      return (
        <div>
           <div>
            <Header />
            <div>PQD</div>
            <Footer />
          </div>
        </div>
      )
    }
    return (
      <div>
        <div>
          <Header />

          <div className="container-fluid myAssets">
            <div className="row p-0" id="gradient-header">
              <div className="col-12 text-center mx-auto p-5">
                <div className="f-prime large thirds">
                  {this.state.chapterName}
                </div>
                <div className="f-second text-light">PQD Protocol</div>
              </div>
            </div>

            <div className="row bg-dark p-0">
              <div className="col-12 mx-auto p-0">
                <div className="row mx-auto p-2">
                  {this.state.assets.map(asset => (
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 p-2 card"
                      key={asset.assetId}
                    >
                      <div className="thumbnail">
                        <img src={asset.imgLink} />
                        <div className="caption">
                          <div className="f-prime sml primes">
                            {asset.assetName}
                          </div>
                          <div className="f-third text-light">
                            {asset.assetId}
                          </div>
                          <hr />
                          <p>{asset.description}</p>
                          <br />
                          <div className="mb-0">
                            <a
                              onClick={() =>
                                this.exploreAssetclicked(
                                  asset.assetId,
                                  asset.chapterName
                                )
                              }
                              className="btn btn-card"
                            >
                              View More
                            </a>
                            <br />
                            <br />
                            <a
                              className="btn btn-card"
                              hidden={this.state.status}
                              onClick={() =>
                                this.updateButtonClicked(
                                  asset.assetId,
                                  asset.chapterName
                                )
                              }
                            >
                              Invest
                            </a>
                            <span>{"  "}</span>
                            <a
                              className="btn btn-card"
                              hidden={this.state.status}
                              onClick={() =>
                                this.deleteButtonClicked(asset.assetId)
                              }
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="myButtonDiv">
            <button
              onClick={() => this.addAssetClicked(-1, this.state.chapterName)}
              hidden={this.state.status}
              id="myButton"
            >
              ADD Asset
            </button>
          </div>

          {/* ======== */}

          {/* ========= */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Assets;
