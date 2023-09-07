import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Header from "../view/Header";
import Footer from "../view/Footer";
// import "../src/App.css";
// import ChapterSpringDataService from "./service/ChapterSpringDataService";
class ChapterFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterName: this.props.match.params.chapterName,
      chapterDescription: "",
      disabled: "true",
      buttonName: "Update",
      message: ""
    };
    this.validateChapterForm = this.validateChapterForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    let auth_key = localStorage.getItem("auth_Key");
    let role = localStorage.getItem("role");
    if (auth_key && role == 1) {
      const SERVICE_API_URL = "http://localhost:3002";
      if (this.state.chapterName == -1) {
        this.setState({
          disabled: false,
          buttonName: "Add",
          chapterName: ""
        });
        return;
      }
      axios
        .get(`${SERVICE_API_URL}/api/getChapter/${this.state.chapterName}`)
        .then(response => {
          console.log(response);
          this.setState({
            chapterDescription: response.data[0].chapterDescription
          });
          console.log(this.state.chapterDescription);
        });
    } else if (auth_key) {
      this.props.history.push("/api/chapters/get_all");
    } else {
      this.props.history.push("/");
    }
  }

  onSubmit(chapter) {
    const SERVICE_API_URL = "http://localhost:3002";

    if (this.state.chapterName === "") {
      axios.post(`${SERVICE_API_URL}/api/chapters`, chapter).then(response => {
        console.log(response);
        if (response.data.success == false) {
          this.setState({
            message: "Service Name already exists, Enter a different name"
          });
        } else {
          this.props.history.push(`/api/chapters/get_all`);
        }
      });
    } else {
      axios
        .put(
          `${SERVICE_API_URL}/api/updateChapter/${this.state.chapterName}`,
          chapter
        )
        .then(response => {
          console.log(response);
          this.props.history.push(`/api/chapters/get_all`);
        });
    }
  }

  validateChapterForm(values) {
    let errors = {};

    if (!values.chapterName) {
      errors.chapterName = "Enter a Service Name";
    } else if (!values.chapterDescription) {
      errors.chapterDescription = "Enter a Service Description";
    }
    return errors;
  }
  render() {
    let { chapterName, chapterDescription } = this.state;

    return (
      <div>
        <Header />
        <div className="container myPadding">
          <h1 id="myHeaderClass">{this.state.buttonName} Service</h1>
          <Formik
            initialValues={{ chapterName, chapterDescription }}
            enableReinitialize={true}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validateAssetForm}
          >
            <Form>
              <ErrorMessage
                name="chapterName"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="chapterDescription"
                component="div"
                className="alert alert-warning"
              />

              <h2 className="myError">{this.state.message}</h2>
              <br />

              <fieldset className="form-group">
                <label>Service Name</label>

                <Field
                  className="form-control"
                  placeholder="Enter a Service Name"
                  type="text"
                  name="chapterName"
                  disabled={this.state.disabled}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Service Description</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Service Description"
                  name="chapterDescription"
                  component="textarea"
                  rows="6"
                />
              </fieldset>
              <button className="btn btn-secondary" type="submit">
                {this.state.buttonName}
              </button>
            </Form>
          </Formik>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default ChapterFormPage;
