import "./App.css";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import {
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Typpography,
} from "@mui/material";
import store from "./utils/store";

import { darkTheme, lightTheme } from "./utils/theme";
import { toggleTheme } from "./utils/themeSlice";

function App() {
  const [currentUser, changeCurrentUser] = useState("rrich-kray");
  const [search, updateSearch] = useState("");
  const api = `https://api.github.com/users/${search}`;

  const fetchUser = async () => {
    const res = await fetch(api);
    res.json().then((userObj) => {
      changeCurrentUser(userObj);
    });
  };

  const handleInputChange = (e) => {
    updateSearch(e.target.value);
  };

  const addDateSuffix = (date) => {
    let dateStr = date.toString();

    const lastChar = dateStr[dateStr.length - 1];

    if (lastChar === "1" && dateStr !== "11") {
      dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
    return dateStr;
  };

  const formatDate = (
    timestamp,
    { monthLength = "short", dateSuffix = true } = {}
  ) => {
    const months = {
      0: monthLength === "short" ? "Jan" : "January",
      1: monthLength === "short" ? "Feb" : "February",
      2: monthLength === "short" ? "Mar" : "March",
      3: monthLength === "short" ? "Apr" : "April",
      4: monthLength === "short" ? "May" : "May",
      5: monthLength === "short" ? "Jun" : "June",
      6: monthLength === "short" ? "Jul" : "July",
      7: monthLength === "short" ? "Aug" : "August",
      8: monthLength === "short" ? "Sep" : "September",
      9: monthLength === "short" ? "Oct" : "October",
      10: monthLength === "short" ? "Nov" : "November",
      11: monthLength === "short" ? "Dec" : "December",
    };

    const dateObj = new Date(timestamp);

    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();

    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours - 12)
        : dateObj.getHours();

    if (hour === 0) {
      hour = 12;
    }

    // const minutes = dateObj.getMinutes() < 10 ? "0" : "" + dateObj.getMinutes();
    // const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year}`;

    return formattedTimeStamp;
  };

  return (
    <Provider store={store}>
      <div id="app">
        <div id="content-container">
          <div id="theme-toggle"></div>
          <div id="info-bar">
            <div id="switch">
              <div id="knob"></div>
            </div>
          </div>
          <div id="search-bar">
            <input
              onChange={handleInputChange}
              placeholder="Enter GitHub username..."
            ></input>
            <button id="search-btn" onClick={fetchUser}>
              Search
            </button>
          </div>
          <div id="user-info-container">
            <img
              id="avatar"
              className="user-item"
              src={currentUser.avatar_url}
              alt="avatar"
            ></img>
            <h1 id="username" className="user-item">
              {currentUser.login}
            </h1>
            <span id="join-date" className="user-item">
              {currentUser.created_at
                ? `Joined at: ${formatDate(currentUser.created_at)}`
                : ""}
            </span>
            <p id="bio" className="user-item">
              {!currentUser.bio ? "No Bio Found" : currentUser.bio}
            </p>
            <div id="stats-container" className="user-item">
              <div id="repos" className="stat-box">
                <span>Repos</span>
                <span style={{ color: "white", fontSize: "1.5rem" }}>
                  {currentUser.public_repos}
                </span>
              </div>
              <div id="followers" className="stat-box">
                <span>Repos</span>
                <span style={{ color: "white", fontSize: "1.5rem" }}>
                  {currentUser.followers}
                </span>
              </div>
              <div id="following" className="stat-box">
                <span>Repos</span>
                <span style={{ color: "white", fontSize: "1.5rem" }}>
                  {currentUser.following}
                </span>
              </div>
            </div>
            <div id="other-info" className="user-item">
              <span className="other-stat">{currentUser.location}</span>
              <span className="other-stat">
                {!currentUser.twitter_username
                  ? "Not Available"
                  : currentUser.twitter_username}
              </span>
              <span className="other-stat">{currentUser.blog}</span>
              <span className="other-stat"></span>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
