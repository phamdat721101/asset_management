import React, { Component } from "react";
import axios from "axios";

class register extends Component {
  constructor(props) {
    super(props);
    this.registerClicked = this.registerClicked.bind(this);
  }

  registerClicked() {
    axios
      .post("http://localhost:3002/api/users/register", {
        email: "cloud@gmail.com",
        password: "cloud34",
        firstName: "Cloud",
        lastName: "Cloud"
      })
      .then(response => {
        console.log(response);
      });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.registerClicked()}>Register</button>
      </div>
    );
  }
}

export default register;
