import React, { useState } from "react";

import { Hashicon } from "@emeraldpay/hashicon-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "react-toastify/dist/ReactToastify.css";
import { deleteTweet } from "../feature/checkProfile/checkProfileSlice";

import {
  RiHeartFill,
  RiHeartLine,
  RiMessage2Fill,
  RiShareForwardFill,
  RiSendPlane2Fill,
  RiDeleteBin5Line,
  RiUpload2Fill,
} from "react-icons/ri";
import { Button, Form, Row } from "react-bootstrap";

import styles from "./styles/PostItem.module.css";
import { useDispatch } from "react-redux";
import {
  addLove,
  addComment,
  getFollowingPosts,
} from "../feature/Post/PostSlice";

function PostItem(props) {
  const dispatch = useDispatch();

  const [loveStatus, setLoveStatus] = useState(props.loveList!==null?props.loveList.includes(localStorage.getItem("userName")):false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("userName")
  );
  const [postId, setPostId] = useState(props.postId);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  function handleLoveClick(e) {
    e.preventDefault();
    if(props.handles!=="user"){
    if(props.loveList === null || props.loveList === ""){
      setLoveStatus(true);
      dispatch(addLove({ postId: postId, userId: currentUserId }));
    }
    else if (!props.loveList.includes(currentUserId)) {
      setLoveStatus(true);
      dispatch(addLove({ postId: postId, userId: currentUserId }));
    } else {
      setLoveStatus(false);
      dispatch(addLove({ postId: postId, userId: currentUserId }));
    }
  }
  }



  function handleDeleteClick(e){
    e.preventDefault();
    if (window.confirm('Are you sure you wish to delete this item?')){
    dispatch(deleteTweet({
      postId: postId,
      userId: localStorage.getItem("userName")
    }
      ));
  }
  }

  function handleShareClick(e) {
    dispatch(getFollowingPosts());
  }

  function handleCommentButtonClick(e) {
    setCommentStatus(!commentStatus);
  }

  function handleCommentContentChange(e) {
    e.preventDefault();

    setCommentContent(e.target.value);

    if (commentContent.length > 0 && commentContent.length - 1 <= 144) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);
    }
  }

  function sendComment(e) {
    if(commentContent.length>1 && props.handles!=="user"){
    dispatch(
      addComment({
        postId: postId,
        newComment: {
          userId: localStorage.getItem("userName"),
          userFullname:
            localStorage.getItem("userName"),
          content: commentContent,
        },
      })
    );
    setCommentContent("");
  }
  }

  return (
    <div className="border shadow rounded-3 p-3 mt-3" style={{background: "azure"}}>
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="mx-3">
            <div className="d-flex flex-column">
              <div style={{fontWeight: "bold",fontSize: "14px"}}>{props.firstName + " " + props.lastName}</div>
              <div className="text-secondary" style={{fontSize: "14px"}}>{timeAgo.format(new Date(props.postDate).getTime())}</div>
            </div>
          </div>
        </div>
        <div className="mx-3">
          <div>
            <h5 style={{color: "blue"}}>{props.handleName}</h5>
            <p>{props.content}</p>
          </div>
        </div>

        {/* Sub-functions of a post */}

        <div className="d-flex justify-content-center align-items-center">
          {/* Sub-function love button */}
          <div className="mx-3">
            <span
              className={`${styles.loveButton} mx-1 fs-4`}
              onClick={handleLoveClick}
            >
              {loveStatus ? (
                <RiHeartFill className="text-danger" />
              ) : (
                <RiHeartLine className="text-danger" />
              )}
            </span>
            <span>
              {props.loveList !== null && props.loveList !=="" ? props.loveList.length : null}
            </span>
          </div>

          {/* Sub-function comment button */}
          <div className="mx-3">
            <span
              className={`${styles.commentButton} mx-1 fs-4`}
              onClick={handleCommentButtonClick}
            >
              <RiMessage2Fill className="text-primary" />
            </span>
            <span>
              {props.commentList !==null && props.commentList !=="" ? props.commentList.length: null}
            </span>
          </div>

          {/* Sub-function share button */}
          {props.handles!=="user"?(
          <div className="mx-3">
            <span
              // className={`${styles.shareButton} mx-1 fs-4`}
              
            >
              {/* <RiShareForwardFill className="text-success" /> */}
            </span>
            <span>
              {/* {props.shareList.length > 0 ? props.shareList.length : null} */}
            </span>
          </div>):(
            <div className="d-flex justify-content-center align-items-center">
            <div className="mx-3">
            <span
              className={`${styles.deleteButton} mx-1 fs-4`}
              onClick={handleDeleteClick}
            >
              <RiDeleteBin5Line className="text-danger" />
            </span>
          </div>
          {/* <div className="mx-3">
            <span
              className={`${styles.shareButton} mx-1 fs-4`}
              onClick={""}
            >
              <RiUpload2Fill className="text-success" />
            </span>
          </div> */}
          </div>
          )
        }
        </div>

        {/* List of comments and comment input box */}
        {commentStatus === true && props.handles !== "user" ? (
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <Form className="w-100 mx-3">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Tweet your reply"
                    value={commentContent}
                    onChange={handleCommentContentChange}
                  />
                </Form.Group>
              </Form>
              <span className="mx-1">{commentContent.length}/144</span>
              <div className="ms-auto">
                <Button
                  variant="success"
                  className="p-1 mx-2"
                  disabled={sendButtonDisable}
                  onClick={sendComment}
                  style={{background: "#1A8CD8",borderColor: "#1A8CD8"}}
                >
                  <RiSendPlane2Fill className="fs-4" />
                </Button>
              </div>
            </div>
            {props.commentList!==null?(props.commentList.map((commentItem) => (
              <div className="my-3 p-2 mx-3" style={{background: "#F9F9F9"}}>
                <div className="d-flex align-items-center">
                  <div className="w-100 mx-1 fw-bold">
                    <span>{commentItem.substring(0,commentItem.indexOf('-'))}</span>
                  </div>
                </div>
                <div>{commentItem.substring(commentItem.indexOf('-')+1,)}</div>
              </div>
            ))):(<span></span>)}
          </div>
        ) : (
          <span></span>
        )}
      </Row>
    </div>
  );
}

export default PostItem;