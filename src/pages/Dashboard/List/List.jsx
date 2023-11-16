import React, { useState, useEffect } from "react";
import "./Lists.css";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import ListCategories from "../ListCategories/ListCategories";
import Items from "../Items/Items";

const List = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const listcat = async () => {
      try {
        setListName(list.name);
        setDescription(list.description);
        setCategory(list.list_cat_id);

        const categoriesResponse = await fetch(
          "http://localhost/pem-api/listCategories.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ list_cat_id: list.list_cat_id }),
          }
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        setCategory(list.list_cat_id);

        const itemsResponse = await fetch("http://localhost/pem-api/item.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list_id: list.id }),
        });
        const itemsCountData = await itemsResponse.json();
        setItems(itemsCountData);
      } catch (error) {
        console.error("Error", error);
      }
    };

    listcat();
  }, [isExpanded, list]);

  const handleCategoryChange = async (e) => {
    const newCategory = e.target.value;

    if (items.length > 0) {
      alert("You cannot change the category with items in the list.");
      return;
    }

    try {
      const updateResponse = await fetch(
        "http://localhost/pem-api/updateListCategory.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listId: list.id,
            newCategoryId: newCategory,
          }),
        }
      );
      const data = await updateResponse.json();
      if (data) {
        setCategory(newCategory);
        setCategories((prevCategories) => {
          return prevCategories.map((cat) =>
            cat.id === parseInt(newCategory)
              ? { ...cat, selected: true }
              : { ...cat, selected: false }
          );
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="list">
      <div className="listCategory">
        {isExpanded ? (
          <>
            <select
              className="selectCategory"
              onChange={handleCategoryChange}
              value={category}
            >
              <ListCategories />
            </select>
          </>
        ) : (
          <span>{categories.find((cat) => cat.id === category)?.name}</span>
        )}
      </div>
      <div className="listName">
        {isExpanded ? (
          <>
            <input
              type="text"
              value={listName}
              className="name"
              placeholder="Name"
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
            <textarea
              className="description"
              placeholder="Description"
              defaultValue={description}
            />
            <div className="searchItems">
              <input type="text" placeholder="Search" />
              <label className="searchIcon" htmlFor="searchInput">
                <FaSearch />
              </label>
            </div>
          </div>
          <Items list_id={list.id} list_category={list.list_cat_id} />
        </div>
      )}
      <div className="listPrice">
        <span>Total</span> $250
      </div>
    </div>
  );
};

export default List;
