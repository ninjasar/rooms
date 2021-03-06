import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./loginForm.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.loginClicked = this.props.loginClicked;
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }


handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

handleSubmit = async event => {
  event.preventDefault();

  try {
    this.loginClicked(this.state.email, this.state.password);

  } catch (e) {
    alert(e.message);
  }
}

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>NYU email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
