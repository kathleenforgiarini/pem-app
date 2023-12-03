import React, { useState, useEffect, useCallback } from "react";
import "./Lists.css";
import { FaAngleDown, FaPlus, FaTrash } from "react-icons/fa";
import ListCategories from "../ListCategories/ListCategories";
import Items from "../Items/Items";
import ShareList from "./ShareList/ShareList";

const List = ({ list, listLists, sharedList }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shareWithEmail, setShareWithEmail] = useState("");
  const [totalPriceColor, setTotalPriceColor] = useState("green");
  const [listState, setListState] = useState(list);

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
    if (totalPrice > listState.max_price) {
      setTotalPriceColor("red");
    } else {
      setTotalPriceColor("green");
    }
    handleListChange("total_price", totalPrice);
    listLists();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice, listState.max_price]);

  useEffect(() => {
    if (items.length > 0) {
      const total = items.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.price * item.quantity);
      }, 0);
      handleChildPrice(total);
      listLists();
    }
  }, [items, handleChildPrice, listLists]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost/pem-api/manageListCategories.php",
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
      const response = await fetch("http://localhost/pem-api/manageItems.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ operation: "select", list_id: listState.id }),
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
    listLists();
  }, [listState, isExpanded, fetchItems, fetchCategories, listLists]);

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
        "http://localhost/pem-api/manageLists.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "update",
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

  const handleClickShareWithEmail = async () => {
    try {
      const responseShared = await fetch(
        "http://localhost/pem-api/manageShareLists.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "create",
            listId: listState.id,
            email: shareWithEmail,
          }),
        }
      );

      const data = await responseShared.json();
      if (data) {
        alert(data);
        listLists();
        setShareWithEmail("");
      } else {
        alert("Please enter a valid email");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleClickDeleteList = async (listId) => {
    const deleteList = window.confirm(
      "Are you sure you want to delete the list?"
    );
    if (deleteList) {
      try {
        const responseDelete = await fetch(
          "http://localhost/pem-api/manageLists.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ operation: "delete", listId: listId }),
          }
        );

        const data = await responseDelete.json();
        if (data) {
          alert(data);
          listLists();
        }
      } catch (error) {
        console.error("Error", error);
      }
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

            {!sharedList && (
              <div>
                <FaTrash
                  className="deleteList"
                  title="Delete list"
                  onClick={() => handleClickDeleteList(listState.id)}
                />
              </div>
            )}
          </>
        ) : (
          <span>
            {categories.find((cat) => cat.id == listState.list_cat_id)?.name}
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
        <FaAngleDown className="angleDown" onClick={handleExpand} />
      </div>

      {isExpanded && (
        <>
          <div className="items">
            <div className="descSearch">
              <textarea
                className="description"
                placeholder="Description"
                value={listState.description}
                onChange={(e) =>
                  handleListChange("description", e.target.value)
                }
              />
              {/* <div className="searchItems">
              <input type="text" placeholder="Search" />
              <label className="searchIcon" htmlFor="searchInput">
                <FaSearch />
              </label>
            </div> */}
            </div>
            <Items
              list_id={listState.id}
              list_category={listState.list_cat_id}
              handleChildPrice={handleChildPrice}
            />
          </div>
          {!sharedList && (
            <>
              <div className="listFunctions">
                <div className="maxPrice">
                  <label>Maximum price $</label>
                  <input
                    type="number"
                    value={listState.max_price}
                    onChange={(e) =>
                      handleListChange("max_price", e.target.value)
                    }
                  />
                </div>
                <div className="shareList">
                  <label>Share list</label>
                  <div className="inputShare">
                    <input
                      type="text"
                      placeholder="E-mail"
                      value={shareWithEmail}
                      onChange={(e) => setShareWithEmail(e.target.value)}
                    />
                    <FaPlus
                      className="plusShareWithEmail"
                      onClick={() => handleClickShareWithEmail()}
                    ></FaPlus>
                  </div>
                </div>
              </div>
              <ShareList listId={listState.id} />
            </>
          )}
        </>
      )}
      <div className="listPrice" style={{ color: totalPriceColor }}>
        <span>Total</span> ${totalPrice}
      </div>
    </div>
  );
};

export default List;
