import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAccounts, getAccountsByUser } from "../feature/Accounts/AccountSlice";
import AccountItem from "./AccountItem";
import { Button, Form } from "react-bootstrap";
function AllAccounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.AccountReducer.followerAccounts
  );
  
  const [disablePostButton, setDisablePostButton] = useState(true);
  const [handle, setHandle] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/unauthorized");
    }
    dispatch(getAllAccounts());
  }, []);

  
  

  async function handleCreatePost(e) {
    e.preventDefault();
    dispatch(getAccountsByUser({
      username:handle,
    }));
  }
  function handleChange(e) {
    setHandle(e.target.value);
    if(e.target.value.length>0 && e.target.value.length<25){
      setDisablePostButton(false);
    }
    else{
      dispatch(getAllAccounts());
      setDisablePostButton(true);
    }
  }
  

  return (
    <div className="mt-2">
      <h1 style={{fontSize: "30px"}}>All User Accounts</h1>
      <Form className="d-flex flex-column">
          <div className="d-flex justify-content-start align-items-center">
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>            
            <Form.Control
              type="text"
              value={handle}
              onChange={handleChange}
            />
          </Form.Group>
            <Button
              onClick={handleCreatePost}
              variant="success"
              disabled={disablePostButton}
              className="col-2 mx-3"
              style={{background: "#1A8CD8",borderColor: "#1A8CD8",marginTop: "7px"}}
            >
              Search
            </Button>
            </div>
      </Form>
      {storeFollowerAccounts!==null && storeFollowerAccounts.length>0? (
        storeFollowerAccounts.map((followerAccount) => {
          return (
            <AccountItem
              key={followerAccount.id}
              id={followerAccount.id}
              firstName={followerAccount.firstName}
              lastName={followerAccount.lastName}
              username={followerAccount.userName}
              contact={followerAccount.contactNo}
            />
          );
        })
      ) : (
        <span>No Users Found</span>
      )}
    </div>
  );
}

export default AllAccounts;
