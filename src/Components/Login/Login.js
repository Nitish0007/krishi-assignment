import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./style/Login.css";

import { Grid, Hidden, InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import svg from "../../used/refreshing.svg";

function Login(props) {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef();
  const passRef = useRef();
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
  });

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const setNull = () => {
    emailRef.current.value = null;
    passRef.current.value = null;
  };

  function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const myfieldError = { ...fieldError };
    if (mailformat.test(inputText)) {
      myfieldError.email = "";
      setFieldError(myfieldError);
    } else {
      myfieldError.email = "You have entered an invalid email address!";
      setFieldError(myfieldError);
    }
  }

  const signIn = () => {
    if (!emailRef.current.value || !passRef.current.value) {
      setErrorMsg("Enter required values");
      return;
    }
    const index = users.findIndex(
      (user) =>
        user.email === emailRef.current.value &&
        user.password === passRef.current.value
    );
    if (index < 0) {
      setErrorMsg("Invalid credentials");
    }
    console.log(users[index]);
    props.setAuth(users[index]);
    localStorage.setItem("auth", true);
    localStorage.setItem("currUser", JSON.stringify(users[index]));
    history.push("/fetch_with_auth");
  };

  return (
    <div className="login">
      <Grid container className="login_container">
        <Hidden smDown>
          <Grid
            className="login_container_svg"
            item
            xs={false}
            sm={false}
            md={6}
            lg={6}
            xl={6}
          >
            <img src={svg} alt=""></img>
          </Grid>
        </Hidden>

        <Grid
          className="login_container_form"
          item
          xs={false}
          sm={false}
          md={6}
          lg={6}
          xl={6}
        >
          <span>
            Not a member?
            <Link className="loginLink" to="/signup">
              &nbsp;Sign Up
            </Link>
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
              setNull();
            }}
          >
            <p className="title">Krishi Network</p>
            <h2>Login</h2>
            <label>Username or Email</label>
            <TextField
              className="textfield"
              inputRef={emailRef}
              variant="outlined"
              size="small"
              error={fieldError.email ? true : false}
              helperText={fieldError.email}
              onBlur={(e) => {
                const myfieldError = { ...fieldError };
                if (!e.target.value) {
                  myfieldError.email = "field can't be empty";
                  setFieldError(myfieldError);
                } else {
                  myfieldError.email = "";
                  setFieldError(myfieldError);
                }
                ValidateEmail(e.target.value);
              }}
            />
            <label>Password</label>
            <TextField
              className="textfield"
              inputRef={passRef}
              type={showPassword ? "text" : "password"}
              placeholder="6+ characters"
              variant="outlined"
              size="small"
              error={fieldError.password ? true : false}
              helperText={fieldError.password}
              onBlur={(e) => {
                const myfieldError = { ...fieldError };
                if (e.target.value.length < 6 && e.target.value.length !== 0) {
                  myfieldError.password = "password must contain 6 character";
                  setFieldError(myfieldError);
                } else if (!e.target.value) {
                  myfieldError.password = "field can't be empty";
                  setFieldError(myfieldError);
                } else {
                  myfieldError.password = "";
                  setFieldError(myfieldError);
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button
                      style={{ border: "none", backgroundColor: "#fdf7ed" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </button>
                  </InputAdornment>
                ),
              }}
            />
            <p style={{ color: "red" }}>{errorMsg ? errorMsg : ""}</p>
            <button className="login_btn">Login</button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    fetchedData: state.fetchedData,
    currUser: state.loggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (data) =>
      dispatch({
        type: "LOG_IN",
        data: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
