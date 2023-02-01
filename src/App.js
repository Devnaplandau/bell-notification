import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NullPage from "./pages/NullPage";
import PostPage from "./pages/PostPage";
import {
  getTokenFromFirebase,
  onMessageListener,
  requestPermission,
} from "./config/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = socketIO.connect("http://localhost:4079");
function App() {
  const [data, setData] = useState("");
  const [tokenUser, setTokenUser] = useState("");
  useEffect(() => {
    requestPermission();
    //Logs the device token to the console
    getTokenFromFirebase().then((tokenUsers) => {
      setTokenUser(tokenUsers);
    });

    //Listen and logs the push messages from the server.
    onMessageListener()
      .then((payload) => {
        setData(payload);
        toast(payload.notification.body);
        console.log("From Message", payload);
      })
      .catch((err) => console.log("failed: ", err));
  });
  //  useEffect Ở TH này không truyền dependencies vì nếu truyền sẽ chỉ chạy 1 lần
  //  nếu có api notify thì khai báo dependencies do api update liên lục thì useEffect mới đc re-render

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/post"
            element={
              <PostPage socket={socket} notify={data} tokenUser={tokenUser} />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NullPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
