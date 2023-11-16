import React from "react";
import "./Lists.css";
import List from "./List";

const Lists = ({ lists }) => {
  return (
    <div className="listsUser">
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  );
};

export default Lists;
