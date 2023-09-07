import React, { Component } from "react";
import ChapterDataService from "../Services/ChapterDataService";
import Header from "./view/Header";
import Photo from "./../photos/black.jpg";
import Footer from "./view/Footer";
import axios from "axios";

class Chapters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
      status: true
    };
    this.exploreClicked = this.exploreClicked.bind(this);
    this.addChapterClicked = this.addChapterClicked.bind(this);
    this.editClicked = this.editClicked.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  componentWillMount() {
    sessionStorage.setItem("url", window.location.pathname);
    let auth_key = localStorage.getItem("auth_Key");
    let role = localStorage.getItem("role");
    if (role == 1) {
      this.setState({
        status: false
      });
    }
    if (auth_key) {
      ChapterDataService.getAllChapters()
        .then(response => {
          this.setState({
            chapters: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.props.history.push("/");
    }
  }

  editClicked(chapterName) {
    console.log("Edit clicked");
    this.props.history.push(`/api/editChapter/${chapterName}`);
  }

  exploreClicked(chapterName) {
    console.log(chapterName);
    this.props.history.push(`/api/assets/${chapterName}`);
  }
  addChapterClicked(chapterName) {
    console.log("Hi");
    this.props.history.push(`/api/addChapter/${chapterName}`);
  }

  deleteClicked(chapterName) {
    const SERVICE_API_URL = "http://localhost:3002";
    axios
      .delete(`${SERVICE_API_URL}/api/deleteChapter/${chapterName}`)
      .then(response => {
        console.log(response);
        window.location.reload();
      });
  }
  render() {
    return (
      <div>
        <Header />

        <div className="container myPadding">
          <div className="row">
            {this.state.chapters.map(chapter => (
              <div className="col-md-6" key={chapter._id}>
                <div className="card mb-4 bg-dark text-white">
                  <img className="card-img" src={Photo} alt="Card image" />
                  <div className="card-img-overlay">
                    <h5 className="card-title">{chapter.chapterName}</h5>
                    <p className="card-text">{chapter.chapterDescription}</p>

                    <br />
                    <br />
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => this.exploreClicked(chapter.chapterName)}
                    >
                      Explore More
                    </button>
                    <span> </span>
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => this.editClicked(chapter.chapterName)}
                      hidden={this.state.status}
                    >
                      Edit
                    </button>
                    <span> </span>
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => this.deleteClicked(chapter.chapterName)}
                      hidden={this.state.status}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* ...................... */}
            <div hidden={this.state.status}>
              <div className="col-md-6">
                <div className="card mb-4 bg-dark text-white">
                  <img className="card-img" src={Photo} alt="Card image" />
                  <div className="card-img-overlay">
                    <h5 className="card-title">Publish Service</h5>
                    <p className="card-text">Add More Service</p>

                    <br />
                    <br />
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={() => this.addChapterClicked(-1)}
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* ........................ */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Chapters;
