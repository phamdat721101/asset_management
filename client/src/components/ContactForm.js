import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import "../src/App.css";
import axios from "axios";
import Header from "./view/Header";
import Footer from "./view/Footer";
class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      emailId: "",
      query: "",
      message: ""
    };
    this.validateContactForm = this.validateContactForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    if (!localStorage.getItem("auth_Key")) {
      this.props.history.push("/");
    }
  }

  onSubmit(query) {
    axios
      .get(
        `http://localhost:8011/api/asset/contactUs/${query.emailId}/${query.customerName}/${query.query}`
      )
      .then(response => {
        console.log(response);
        if (response.data == true) {
          this.setState({
            message: "Thank you for contacting us."
          });
          window.scrollTo(0, 0);
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
        if (err) {
          this.setState({
            message:
              "Please kindly check your internet connection, Network error"
          });
        }
      });
  }

  validateContactForm(values) {
    let errors = {};
    if (!values.customerName) {
      errors.customerName = "Enter a Customer Name";
    } else if (!values.emailId) {
      errors.emailId = "Enter a Email Id";
    } else if (!values.query) {
      errors.query = "Enter a Query";
    } else if (!this.isValidURL(values.emailId)) {
      errors.emailId = "Enter a valid Email Id";
    }
    return errors;
  }
  isValidURL(string) {
    var res = string.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return res !== null;
  }
  render() {
    let { customerName, emailId, query } = this.state;
    return (
      <div>
        <Header />
        <div className="container myPadding">
          <h1 id="myHeaderClass">Contact Us</h1>
          <br />
          <Formik
            initialValues={{ customerName, emailId, query }}
            enableReinitialize={true}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validateContactForm}
          >
            <Form>
              <ErrorMessage
                name="customerName"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="emailId"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="query"
                component="div"
                className="alert alert-warning"
              />
              <h2 className="myError">{this.state.message}</h2>
              <br />
              <fieldset className="form-group">
                <label>Customer Name</label>
                <Field
                  className="form-control"
                  placeholder="Enter Your Name"
                  type="text"
                  name="customerName"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Email Id</label>
                <Field
                  className="form-control"
                  placeholder="Enter your Email id(example@gmail.com) "
                  type="text"
                  name="emailId"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label>Query</label>
                <Field
                  className="form-control"
                  placeholder="Enter a Query"
                  component="textarea"
                  rows="6"
                  name="query"
                />
              </fieldset>
              <br />
              <button className="btn btn-secondary" type="submit">
                Contact Us
              </button>
            </Form>
          </Formik>
        </div>
        <br />

        <Footer />
      </div>
    );
  }
}

export default ContactForm;
