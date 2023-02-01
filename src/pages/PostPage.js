import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import NullPage from "./NullPage";
import Nav from "../component/Nav";
import Posts from "./Post";

const PostPage = (props) => {
  const { socket, tokenUser } = props;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    socket.on("posts", (data) => setPosts(data));
  }, []);

  // notify.notification.body
  return (
    <div>
      {localStorage.getItem("_username") ? (
        <>
          <Nav />
          <CreatePost socket={socket} tokenUser={tokenUser} />
          <Posts posts={posts} socket={socket} />
        </>
      ) : (
        <NullPage />
      )}
    </div>
  );
};

export default PostPage;
