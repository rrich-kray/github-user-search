import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [currentUser, changeCurrentUser] = useState("rrich-kray");
  const [search, updateSearch] = useState("");
  const api = `https://api.github.com/users/${search}`;

  const fetchUser = async () => {
    const res = await fetch(api);
    res.json().then((userObj) => {
      console.log(userObj);
      changeCurrentUser(userObj);
      console.log(currentUser);
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

    const minutes = dateObj.getMinutes() < 10 ? "0" : "" + dateObj.getMinutes();
    const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year}`;

    return formattedTimeStamp;
  };

  return (
    <div id="app">
      <div id="content-container">
        <div id="info-bar"></div>
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
          <img id="avatar" src={currentUser.avatar_url} alt="avatar"></img>
          <h1 id="username">{currentUser.login}</h1>
          <span id="join-date">
            Joined at: {formatDate(currentUser.created_at)}
          </span>
          <p id="bio">{!currentUser.bio ? "No Bio Found" : currentUser.bio}</p>
          <div id="stats-container">
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
          <div id="other-info">
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
  );
}

export default App;
