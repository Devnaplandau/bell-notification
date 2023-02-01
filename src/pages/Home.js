import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    localStorage.setItem("_username", email);
    setEmail("");
    await fetch("http://localhost:4079/sendmail", {
      method: "POST",
      body: JSON.stringify({
        Email: email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    navigate("/post");
  };
  return (
    <main className="home">
      <h2>Sign in to Dev</h2>
      <form className="home__form" onSubmit={handleSignIn}>
        <label htmlFor="username">Enter your email to use Novu 🙌</label>
        <input
          type="email"
          id="username"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="home__cta">SIGN IN</button>
      </form>
    </main>
  );
};

export default Home;
