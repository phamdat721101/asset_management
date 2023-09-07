import React, { Component } from "react";
import "./../App.css";
import axios from "axios";
import PQD from "./../photos/PQD_pc_Mac.jpg";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      data: [],
      errMessage: ""
    };

    this.OnLogin = this.onLogin.bind(this);
    this.register = this.register.bind(this);
  }

  onChange(e) {
    this.setState({ email: e.target.value });
  }
  onChange1(e) {
    this.setState({ password: e.target.value });
  }

  componentWillMount() {
    if (localStorage.getItem("auth_Key")) {
      this.props.history.push("/api/chapters/get_all");
    }
  }

  onLogin(e) {
    console.log("login");
    e.preventDefault();

    axios
      .post("http://localhost:3002/api/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res);
        if (res.data.loginSuccess == false) {
          console.log(res.data.message);
          this.setState({
            errMessage: res.data.message
          });
        } else {
          localStorage.setItem("auth_Key", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("name", res.data.firstName);
          if (sessionStorage.getItem("url")) {
            this.props.history.push(sessionStorage.getItem("url"));
          } else {
            this.props.history.push("/api/chapters/get_all");
          }
        }
      });
  }

  register(){
    console.log("Register success: ")
  }

  render() {
    return (
      <div>
        <div className="sidenav">
          <a href="https://www.dxc.technology/" target="_new">
            <img src={PQD} alt="PQD Logo" />
          </a>
          <div className="login-main-text">
            <h2>
              PQD Technology
              <br />
              Asset Management
            </h2>
            <br />
            <p>Login from here to access.</p>
          </div>
        </div>
        <div className="main">
          <div className="col-md-6 col-sm-12">
            <div className="login-form">
              {/* form */}
              <form action="" onSubmit={this.OnLogin}>
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.onChange1(e)}
                  />
                </div>
                <input type="submit" className="btn btn-black" value="Login" />

                <span> &nbsp; &nbsp;</span>
                <br />
                <br />
                <h6 className="alertclassName">{this.state.errMessage}</h6>
              </form>
              <button onClick={() => this.register()} className="btn btn-secondary">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
