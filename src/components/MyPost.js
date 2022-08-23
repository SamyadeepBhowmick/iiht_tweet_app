import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";

function MyPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/unauthorized");
    }

    if (localStorage.getItem("userName") !== null) {
      dispatch(getProfilePosts(localStorage.getItem("userName")));
      
    }
  }, []);

  return (
    <div className="mt-2">
      <h1 style={{fontSize: "30px"}}>My Tweets : {localStorage.getItem("firstName")+" "+localStorage.getItem("lastName")}</h1>
      {postList !== null ? (
        postList.map((post) => {
          return (
            <PostItem
              key={post.id}
              postId={post.id}
              userId={post.username}
              firstName={localStorage.getItem("firstName")}
              lastName={localStorage.getItem("lastName")}
              image=""
              handleName={post.handleName}
              content={post.message}
              loveList={post.likes}
              shareList=""
              commentList={post.replies}
              postDate={post.time}
              handles="user"
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default MyPost;
