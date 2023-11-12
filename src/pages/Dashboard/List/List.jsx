import React, { useState } from "react";
import "./List.css";
import {
  FaRegSquare,
  FaTimes,
  FaAngleDown,
  FaRegCheckSquare,
  FaSearch,
} from "react-icons/fa";
import ListCategories from "../ListCategories/ListCategories";

const List = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [category, setCategory] = useState("Supermarket");
  const [listName, setListName] = useState("List 1");

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="list">
      <div className="listCategory">
        {isExpanded ? (
          <>
            <select onChange={(e) => setCategory(e.target.value)}>
              <ListCategories />
            </select>
          </>
        ) : (
          <span>{category}</span>
        )}
      </div>
      <div className="listName">
        {isExpanded ? (
          <>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </>
        ) : (
          <span onClick={handleExpand}>{listName}</span>
        )}
        <FaAngleDown onClick={handleExpand} />
      </div>

      {isExpanded && (
        <div className="items">
          <div className="descSearch">
            <textarea className="description" placeholder="Description" />
            <div className="searchItems">
              <input type="text" placeholder="Search" />
              <label className="searchIcon" htmlFor="searchInput">
                <FaSearch />
              </label>
            </div>
          </div>

          <div className="listItems">
            <div className="item">
              <FaRegSquare />
              <p>Item 1</p>
              <p>2</p>
              <p>$15</p>
              <p>Kitchen</p>
              <FaTimes />
            </div>
            <div className="completedItems">
              <div className="completedItem">
                <div>Done</div>
                <FaAngleDown />
                <FaRegCheckSquare />
                <p>Item 2</p>
                <p>2</p>
                <p>$15</p>
                <p>Kitchen</p>
                <FaTimes />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="listPrice">
        <span>Total</span> $250
      </div>
    </div>
  );
};

export default List;
