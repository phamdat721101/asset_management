import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import "../src/App.css";
import axios from "axios";
import Header from "../view/Header";
import Footer from "../view/Footer";
import CreateAsset from "./CreateAsset";

class AssetFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetId: this.props.match.params.assetId,
      amount: 0,
      chapterName: this.props.match.params.chapterName,
      assetName: "",
      bBenefits: "",
      description: "",
      gitHubLink: "",
      imgLink: "",
      disabled: "true",
      buttonName: "Update",
      message: "",
      chapters: []
    };
    this.validateAssetForm = this.validateAssetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    const SERVICE_API_URL = "http://localhost:3002";

    axios.get(`${SERVICE_API_URL}/api/chapters/get_all`).then(response => {
      this.setState({
        chapters: response.data
      });
      console.log(this.state.chapters);
    });

    let auth_key = localStorage.getItem("auth_Key");
    let role = localStorage.getItem("role");
    if (auth_key && role == 1) {
      if (this.state.assetId == -1) {
        this.setState({
          disabled: false,
          buttonName: "Add",
          assetId: ""
        });

        return;
      }

      axios
        .get(
          `${SERVICE_API_URL}/api/assets/${this.state.chapterName}/${this.state.assetId}`
        )
        .then(response => {
          this.setState({
            assetName: response.data[0].assetName,
            amount: response.data[0].amount,
            description: response.data[0].description,
            bBenefits: response.data[0].bBenefits,
            gitHubLink: response.data[0].gitHubLink,
            imgLink: response.data[0].imgLink
          });
        });
    } else if (auth_key) {
      this.props.history.push(`/api/assets/${this.state.chapterName}`);
    } else {
      this.props.history.push("/");
    }
  }

  onSubmit(asset) {
    const SERVICE_API_URL = "http://localhost:3002";
    console.log("PQD asset: ", asset);
    asset.transactionHash = "ewroiewurioweuiro23423"
    if (this.state.buttonName == "Add") {
      // console.log("Hi");
      axios.post(`${SERVICE_API_URL}/api/assets`, asset).then(response => {
        console.log(response);
        if (response.data.success == false) {
          this.setState({
            message: "Duplicate asset Id, Please enter a different asset Id"
          });
          console.log(this.state.message);
        } else {
          this.props.history.push(`/api/assets/${this.state.chapterName}`);
        }
        //
      });
    } else {
      axios
        .put(`${SERVICE_API_URL}/api/updateAsset/${this.state.assetId}`, asset)
        .then(response => {
          console.log(response);
          this.props.history.push(`/api/assets/${this.state.chapterName}`);
        });
    }

    axios.post("http://localhost:4001/v1/asset/createAsset", {"challengeId":asset.assetId, "amount": asset.amount}).then(resp =>{
      console.log("Asset resp: ", resp)
      alert("Create asset success: ", resp.data.data)
    })
  }

  validateAssetForm(values) {
    let errors = {};
    if (!values.assetId) {
      errors.assetId = "Enter a Asset Id";
    }else if (!values.amount) {
      errors.amount = "Enter amount";
    } else if (!values.chapterName) {
      errors.chapterName = "Enter a Chapter Name";
    } else if (!values.assetName) {
      errors.assetName = "Enter a Asset Name";
    } else if (!values.bBenefits) {
      errors.bussinessBenifits = "Enter a Bussiness Benifits";
    } else if (!values.description) {
      errors.description = "Enter a description";
    } else if (!values.gitHubLink) {
      errors.gitHubLink = "Enter a Github Link";
    } else if (!this.isValidURL(values.gitHubLink)) {
      errors.gitHubLink = "Enter a valid Github Link";
    } else if (!values.imgLink) {
      errors.imgLink = "Enter a Image Link";
    } else if (!this.isValidURL(values.imgLink)) {
      errors.imgLink = "Enter a valid Image Link";
    }
    return errors;
  }
  isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }
  render() {
    let {
      assetId,
      amount,
      chapterName,
      assetName,
      bBenefits,
      description,
      gitHubLink,
      imgLink
    } = this.state;

    return (
      <div>
        <Header />
        <div className="container paddingClass">
          <h1 id="myHeaderClass">Create Asset</h1>
          <Formik
            initialValues={{
              assetId,
              amount,
              chapterName,
              assetName,
              bBenefits,
              description,
              gitHubLink,
              imgLink
            }}
            enableReinitialize={true}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validateAssetForm}
          >
            <Form>
              <ErrorMessage
                name="assetId"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="chapterName"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="assetName"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="bBenefits"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="gitHubLink"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="imgLink"
                component="div"
                className="alert alert-warning"
              />
              <h2 className="alert myError">{this.state.message}</h2>
              <fieldset className="form-group">
                <label>Asset Id</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Asset Id"
                  type="text"
                  name="assetId"
                  disabled={this.state.disabled}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Amount</label>
                <Field
                  className="form-control"
                  placeholder="Enter amount"
                  type="text"
                  name="amount"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Service</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Chapter Name"
                  component="select"
                  name="chapterName"
                  disabled={this.state.disabled}
                >
                  {this.state.chapters.map(chapter => (
                    <option value={chapter.chapterName}>
                      {chapter.chapterName}
                    </option>
                  ))}
                </Field>
              </fieldset>
              <fieldset className="form-group">
                <label>Asset Name</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Asset Name"
                  type="text"
                  name="assetName"
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Description"
                  type="text"
                  name="description"
                  component="textarea"
                  rows="6"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Business Benefits</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Business Benefits"
                  type="text"
                  component="textarea"
                  rows="6"
                  name="bBenefits"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Asset Link</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Asset Link"
                  type="text"
                  name="gitHubLink"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Image Link</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Image Link"
                  type="text"
                  name="imgLink"
                />
              </fieldset>
              <button className="btn btn-secondary" type="submit">
                Create Asset
              </button>
            </Form>
          </Formik>
        </div>
        <CreateAsset />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default AssetFormPage;
