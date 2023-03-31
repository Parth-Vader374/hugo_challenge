import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Testing connection to the node server.
  const [backEndData, setBackEndData] = useState([{}]);

  useEffect(() => {
    fetch("/api/application")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setBackEndData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {typeof backEndData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backEndData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}

export default App;
