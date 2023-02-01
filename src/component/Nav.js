import React from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const onNotificationClick = (notification) =>
    navigate(notification.cta.data.url);

  const handleLogOut = () => {
    localStorage.removeItem("_username");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div>
        <img
          src="https://avatars.githubusercontent.com/u/95605404?s=400&u=5a71dae3f35724adb481f5fa6c0e92d7a478a830&v=4"
          alt="Dev.to"
          className="logo"
        />
      </div>
      <div>
        <span style={{ fontSize: "34px" }}>Demo Novu Notifications</span>
      </div>
      <div className="notification__container">
        <div>
          <NovuProvider
            backendUrl={"http://localhost:3000"}
            subscriberId={"eh19HHmssaAu"}
            applicationIdentifier={"eh19HHmssaAu"}
          >
            <PopoverNotificationCenter
              onNotificationClick={onNotificationClick}
            >
              {({ unseenCount }) => (
                <NotificationBell unseenCount={unseenCount} />
              )}
            </PopoverNotificationCenter>
          </NovuProvider>
        </div>
        <button className="logOutBtn" onClick={handleLogOut}>
          LOG OUT
        </button>
      </div>
    </nav>
  );
};

export default Nav;
