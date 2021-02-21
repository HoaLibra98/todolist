import React from "react";
import CreateTask from "./createTask";
import ListTask from "./listTask";
import "./style.scss";
function App() {
  return (
    <div className="container-app">
      <div className="content-left">
        <CreateTask />
      </div>
      <div className="content-right">
        <ListTask />
      </div>
    </div>
  );
}

export default App;
