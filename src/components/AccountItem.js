import React from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import {Row } from "react-bootstrap";

function AccountItem(props) {

  if(props.profile!=="yes"){
  return (
    <div className="border shadow rounded-3 p-3 mt-3" style={{background: "white"}}>
      <Row>
        
          <div className="mx-3 mb-3">
            <h5>{props.firstName + " " + props.lastName}</h5>
          </div>
        
        <div className="mx-3">
          <div>
            <h6>{props.username}</h6>
            <p>{props.contact}</p>
          </div>
        </div>
        </Row>
        </div>
    
  );
  }
  else{
    return (
      <div className="border shadow rounded-3 p-3 mt-3" style={{background: "white"}}>
        <Row>
          
            <div className="mx-3 mb-3">
              <h5>{props.firstName + " " + props.lastName}</h5>
            </div>
          
          <div className="mx-3">
            <h6><b>First Name : </b>
            {props.firstName}
            &emsp;
            &emsp;
            &emsp;
            <b>Last Name : </b>
            {props.lastName}
            </h6>
          </div>
          <div className="mx-3">
              <h6><b>Username (Email) : </b>{props.username}</h6>
          </div>
          <div className="mx-3">
              <h6><b>Contact Number : </b>{props.contact}</h6>
          </div>
        </Row>
      </div>
      
    );
  }
}

export default AccountItem;
