import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import "./Navbar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function Navbar(props) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || false
  );
  const history = useHistory();
  const [currUser, setCurrUser] =
    useState(JSON.parse(localStorage.getItem("currUser")) || {});

  const logout = () => {
    props.setAuth();
    setAuth(false);
    localStorage.setItem("auth", false);
    localStorage.setItem("currUser", JSON.stringify({}));
    setCurrUser({});
    history.push("/");
  };
  return (
    <div className="navbar">
      <div className="navbarLeft">
        <span className="logo">Krishi Network</span>
      </div>
      <div>
        {!auth ? (
          <Link to="/login" className="link">
            Login
          </Link>
        ) : (
          <div style={{ display: "flex", gap: "30px" }}>
            <button
              style={{
                backgroundColor: "#30a08d",
                padding: "8px 18px",
                color: "white",
                border: "none",
                outline: "none",
                borderRadius: "4px",
              }}
              onClick={logout}
            >
              Logout
            </button>
            <span className="navbar_auth_true">
              <AccountCircleIcon /> {currUser?.name}
              <ArrowDropDownIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currUser: state.loggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: () =>
      dispatch({
        type: "LOG_OUT",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
