import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendLoginData } from "../../../../../Redux/LoginUser/action";

class OwnerLoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      checkbox: "",
      isPasswordIncorrect: false,
    };
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      isInputTagEmpty: false,
    });
  };

  handleSubmit = () => {
	  console.log("gaurav")
    const { email, password } = this.state;
    this.props.sendLoginData({
      data: {
        email: email,
        password: password,
      },
      IncorrectPasscallback: () => {
        this.setState({ isPasswordIncorrect: true });
      },
	});
  };

  render() {
    let { email, password, isPasswordIncorrect } = this.state;
    return (
      <>
        <div
          className="container"
          style={{ marginTop: "40px" }}
          class="modal fade"
          id="OwnerLoginModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog mt-5">
            <div class="modal-content">
              <div class="modal-header bg bg-primary">
                <h3
                  style={{ marginTop: "30px" }}
                  class="modal-title text-white ml-0"
                  id="exampleModalLabel"
                >
                  Welcome
                  <p style={{ fontSize: "20px" }}>Log in to owner dashboard</p>
                </h3>
                <br></br>

                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body col-10 offset-1 pb-4 shadow-lg">
                <div className="row card">
                  <div className="col-12">
                    <input
                      name="email"
                      value={this.state.email}
                      onChange={(e) => this.handleChange(e)}
                      className="form-control mt-4"
                      placeholder="Email Address"
                    />
                    <br></br>
                    <input
                      name="password"
                      value={this.state.password}
                      onChange={(e) => this.handleChange(e)}
					  className="form-control mt-4"
					  type = "password"
                      placeholder="Password"
                    />
                    {isPasswordIncorrect && (
                      <p className="text-danger">
                        Entered Password is incorrect
                      </p>
                    )}
                  </div>
                  <div className="d-flex mt-3 text-muted">
                    <div className="ml-3">
                      <input
                        name="checkbox"
                        type="checkbox"
                        value={this.state.checkbox}
                        onChange={(e) => this.handleChange(e)}
                      />
                      <p></p>
                    </div>

                    <div className="ml-2">Remeber me</div>
                  </div>

                  <div className="col-6 offset-2 mt-5">
                    <button
                      style={{ borderRadius: "40px" }}
                      class={
                        email === "" || password === ""
                          ? "btn btn-primary btn-block disabled ml-4 py-3"
                          : "btn btn-primary btn-block ml-4 py-3"
                      }
                      onClick = {this.handleSubmit}
                    >
                      Login
                    </button>
                    <br></br>
                    <br></br>
                    <Link className="ml-1">I forgot my password</Link>

                    <div className="offset-3"></div>
                  </div>
                </div>
              </div>
              <div style={{ height: "200px" }} class="modal-footer">
                <p className="mr-5">
                  Use of this Web site constitutes acceptance of the Vrbo{" "}
                  <p className="text-primary">
                    Terms and Conditions and Privacy Policy.
                  </p>
                </p>
                <p>©2020 Vrbo. All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const MapStateToProps = (state) => {
  return {
    message: state.login.message,
    isSent: state.login.isSent,
    registermessage: state.register.message,
    isUserLoggedIn: state.login.isUserLoggedIn,
    isUserRegistered: state.register.isUserRegistered,
  };
};
const MapDisaptchToProps = (dispatch) => {
  return {
    sendLoginData: (payload) => dispatch(sendLoginData(payload)),
  };
};

export default connect(MapStateToProps, MapDisaptchToProps)(OwnerLoginModal);
