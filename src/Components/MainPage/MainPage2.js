import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./style/Mainpage.css";
import Navbar from "../Navbar/Navbar";

import Card from "./Card";

function MainPage(props) {
  const [err, setErr] = useState("");
  const [fetched, setFetched] = useState(
    JSON.parse(localStorage.getItem("fetched")) || []
  );

  const fetchData = () => {
    // if (fetched !== null) {
    //   console.log("already set");
    //   return;
    // }
    axios
      .get(
        "https://thekrishi.com/test/mandi?lat=28.44108136&lon=77.0526054&ver=89&lang=hi&crop_id=10"
      )
      .then((result) => {
        if (result.data.status !== "success") {
          setErr("SomeThing went wrong!!");
          return;
        }
        console.log(result.data.data.other_mandi);
        setFetched(result.data.data.other_mandi);
        props.setFetchedData(result.data.data.other_mandi);
        localStorage.setItem(
          "fetched",
          JSON.stringify(result.data.data.other_mandi)
        );
      })
      .catch((err) => setErr(err));
  };

  return (
    <div>
      <Navbar />
      <p style={{ color: "red" }}>{err ? err : ""}</p>
      <button
        style={{
          padding: "8px 18px",
          backgroundColor: "#30a08d",
          outline: "none",
          border: "none",
          color: "white",
          borderRadius: "4px",
          display: "block",
          margin: "10px auto",
        }}
        onClick={fetchData}
      >
        fetch
      </button>

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {fetched.map((item, i) => (
          <Card details={fetched[i]} />
        ))}
      </div>
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
    setFetchedData: (data) =>
      dispatch({
        type: "SET_DATA",
        fetchedData: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
