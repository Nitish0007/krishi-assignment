import React from "react";

import "./card.css";

function Card(props) {
  console.log(props);
  return (
    <div className="main">
      <img
        src={props.details?.image}
        height="200px"
        width="200px"
        alt="url not fetched"
      ></img>
      <div className="info">
        <div>
          <label>District</label>
          <p>{props.details?.district}</p>
        </div>
        <div>
          <label>District ID</label>
          <p>{props.details?.district_id}</p>
        </div>
        <div>
          <label>Hindi Name</label>
          <p>{props.details?.district}</p>
        </div>
        <div>
          <label>Market</label>
          <p>{props.details?.market}</p>
        </div>
        <div>
          <label>Last Date</label>
          <p>{props.details?.last_date}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
