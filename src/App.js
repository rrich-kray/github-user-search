import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [currentUser, changeCurrentUser] = useState("");
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
        </div>
      </div>
    </div>
  );
}

export default App;
