import React, { useState, useEffect, useCallback } from "react";
import "./Lists.css";
import { FaAngleDown, FaSearch } from "react-icons/fa";
import ListCategories from "../ListCategories/ListCategories";
import Items from "../Items/Items";

const List = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listState, setListState] = useState({
    id: list.id,
    name: list.name,
    description: list.description,
    max_price: list.max_price,
    user_id: list.user_id,
    list_cat_id: list.list_cat_id,
  });

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChildPrice = useCallback(
    (price) => {
      setTotalPrice(price);
    },
    [setTotalPrice]
  );

  useEffect(() => {
    handleListChange("total_price", totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice]);

  useEffect(() => {
    if (items.length > 0) {
      const total = items.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.price);
      }, 0);
      handleChildPrice(total);
    }
  }, [items, handleChildPrice]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost/pem-api/listCategories.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list_cat_id: listState.list_cat_id }),
        }
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error", error);
    }
  }, [listState]);

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch("http://localhost/pem-api/item.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list_id: listState.id }),
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  }, [listState]);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, [listState, isExpanded, fetchItems, fetchCategories]);

  const handleListChange = async (field, value) => {
    try {
      if (field === "list_cat_id") {
        fetchItems();
        if (items.length > 0) {
          alert(
            "You can not change the category of a list if there is items on it"
          );
          return;
        }
      }
      const updateResponse = await fetch(
        "http://localhost/pem-api/updateList.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listId: listState.id,
            field,
            value,
          }),
        }
      );

      const data = await updateResponse.json();

      if (data) {
        setListState({ ...listState, [field]: value });
      } else {
        alert("Error! Try again...");
      }
    } catch (error) {
      console.error("Error updating list", error);
    }
  };

  return (
    <div className="list">
      <div className="listCategory">
        {isExpanded ? (
          <>
            <select
              className="selectCategory"
              onChange={(e) => handleListChange("list_cat_id", e.target.value)}
              value={listState.list_cat_id}
            >
              <ListCategories />
            </select>
          </>
        ) : (
          <span>
            {categories.find((cat) => cat.id === listState.list_cat_id)?.name}
          </span>
        )}
      </div>
      <div className="listName">
        {isExpanded ? (
          <>
            <input
              type="text"
              value={listState.name}
              className="name"
              placeholder="Name"
              onChange={(e) => handleListChange("name", e.target.value)}
            />
          </>
        ) : (
          <span onClick={handleExpand}>{listState.name}</span>
        )}
        <FaAngleDown onClick={handleExpand} />
      </div>

      {isExpanded && (
        <div className="items">
          <div className="descSearch">
            <textarea
              className="description"
              placeholder="Description"
              value={listState.description}
              onChange={(e) => handleListChange("description", e.target.value)}
            />
            <div className="searchItems">
              <input type="text" placeholder="Search" />
              <label className="searchIcon" htmlFor="searchInput">
                <FaSearch />
              </label>
            </div>
          </div>
          <Items
            list_id={listState.id}
            list_category={listState.list_cat_id}
            handleChildPrice={handleChildPrice}
          />
        </div>
      )}
      <div className="listPrice">
        <span>Total</span> ${totalPrice}
      </div>
    </div>
  );
};

export default List;
