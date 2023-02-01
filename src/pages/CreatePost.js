import React, { useState } from "react";

const CreatePost = (props) => {
  const { socket, tokenUser } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addNewPost(e) {
    e.preventDefault();
    // console.log({ title, content });
    socket.emit("newPost", {
      id: Math.random(),
      title,
      content,
      likes: 0,
      username: localStorage.getItem("_username"),
    });

    sendNotification();
    setContent("");
    setTitle("");
  }
  async function sendNotification() {
    try {
      const sendNotification = await fetch("http://localhost:4079/notify", {
        method: "POST",
        body: JSON.stringify({
          username: localStorage.getItem("_username"),
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await sendNotification.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  async function fakeNumber() {
    try {
      const sendSms = await fetch("http://localhost:4079/sms", {
        method: "POST",
        body: JSON.stringify({
          account: localStorage.getItem("_username"),
          phone: "+84374656596",
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await sendSms.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  async function pushFcm() {
    console.log("FCM Send");
    try {
      const sendFcm = await fetch("http://localhost:4079/push", {
        method: "POST",
        body: JSON.stringify({
          tokenUser: tokenUser,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await sendFcm.json();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="input__container">
      <form className="input__form" onSubmit={addNewPost}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          name="content"
          id="content"
          rows="7"
          placeholder="Write the contents"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div>
          <button className="sendBtn">SEND POST</button>
          <button
            className="sendBtn"
            style={{ marginLeft: "20px" }}
            onClick={fakeNumber}
          >
            SEND SMS
          </button>
          <button
            className="sendBtn"
            style={{ marginLeft: "20px" }}
            onClick={pushFcm}
          >
            PUSH FCM
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
