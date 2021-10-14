import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./style/Signup.css";

import { Grid, Hidden, InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import svg from "../../used/welcome.svg";

function Signup() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef();
  const genderRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const [fieldError, setFieldError] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setNull = () => {
    nameRef.current.value = null;
    genderRef.current.value = null;
    emailRef.current.value = null;
    passRef.current.value = null;
    confirmPassRef.current.value = null;
  };

  const ValidateEmail = (inputText) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const myfieldError = { ...fieldError };
    if (mailformat.test(inputText)) {
      myfieldError.email = "";
      setFieldError(myfieldError);
    } else {
      myfieldError.email = "You have entered an invalid email address!";
      setFieldError(myfieldError);
    }
  };

  const addNewUser = () => {
    if (
      !nameRef.current.value ||
      !genderRef.current.value ||
      !emailRef.current.value ||
      !passRef.current.value ||
      !confirmPassRef.current.value
    ) {
      setErrorMsg("All fields are required");
      return;
    }
    const index = users.findIndex(
      (user) => user.email === emailRef.current.value
    );
    if (index > -1) {
      setErrorMsg("Email already used");
      return;
    }
    if (passRef.current.value !== confirmPassRef.current.value) {
      setErrorMsg("entered passwords are different");
      return;
    }
    const user = {
      name: nameRef.current.value,
      gender: genderRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    setErrorMsg("successfully signedUp");
  };

  return (
    <div className="signup">
      <Grid container className="signup_container">
        <Hidden smDown>
          <Grid
            className="signup_container_svg"
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
          className="signup_container_form"
          item
          xs={false}
          sm={false}
          md={6}
          lg={6}
          xl={6}
        >
          <span>
            Already a member?
            <Link className="loginLink" to="/login">
              &nbsp;Sign In
            </Link>
          </span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addNewUser();
              setNull();
            }}
          >
            <p className="title">Krishi</p>
            <h2>Signup</h2>
            <Grid
              container
              spacing={1}
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              <Grid item className="inputContainer">
                <label>Name</label>
                <TextField
                  className="textfield"
                  inputRef={nameRef}
                  variant="outlined"
                  size="small"
                  error={fieldError.name ? true : false}
                  helperText={fieldError.name}
                  onBlur={(e) => {
                    const myfieldError = { ...fieldError };
                    if (!e.target.value) {
                      myfieldError.name = "field can't be empty";
                      setFieldError(myfieldError);
                    } else {
                      myfieldError.name = "";
                      setFieldError(myfieldError);
                    }
                  }}
                />
              </Grid>
              <Grid item className="inputContainer">
                <label>Gender</label>
                <TextField
                  className="textfield"
                  inputRef={genderRef}
                  variant="outlined"
                  size="small"
                  error={fieldError.gender ? true : false}
                  helperText={fieldError.gender}
                  onBlur={(e) => {
                    const myfieldError = { ...fieldError };
                    if (!e.target.value) {
                      myfieldError.gender = "field can't be empty";
                      setFieldError(myfieldError);
                    } else {
                      myfieldError.gender = "";
                      setFieldError(myfieldError);
                    }
                  }}
                />
              </Grid>
            </Grid>
            <label>Email</label>
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
            <label>Confirm password</label>
            <TextField
              className="textfield"
              inputRef={confirmPassRef}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="6+ characters"
              variant="outlined"
              size="small"
              error={fieldError.confirmPassword ? true : false}
              helperText={fieldError.confirmPassword}
              onBlur={(e) => {
                const myfieldError = { ...fieldError };
                if (e.target.value.length < 6 && e.target.value.length !== 0) {
                  myfieldError.confirmPassword =
                    "password must contain 6 character";
                  setFieldError(myfieldError);
                } else if (!e.target.value) {
                  myfieldError.confirmPassword = "field can't be empty";
                  setFieldError(myfieldError);
                } else {
                  myfieldError.confirmPassword = "";
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
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
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
            <button className="signup_btn">Create Account</button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;
