import React, { useState, useEffect, useCallback } from "react";
import "./Items.css";
import { FaCheck, FaPlus } from "react-icons/fa";
import ItemCategories from "../ItemCategories/ItemCategories";
import Item from "./Item";

const Items = ({ list_id, list_category }) => {
  const [updatedItems, setUpdatedItems] = useState([]);
  const [itemCategory, setItemCategory] = useState("");

  const listItems = useCallback(async () => {
    try {
      const itemsResponse = await fetch("http://localhost/pem-api/item.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list_id: list_id }),
      });
      const itemsCountData = await itemsResponse.json();
      setUpdatedItems(itemsCountData);
    } catch (error) {
      console.error("Error listing items", error);
    }
  }, [list_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/pem-api/item.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list_id: list_id }),
        });

        const data = await response.json();
        setUpdatedItems(data);
      } catch (error) {
        console.error("Error", error);
      }

      listItems();
    };

    fetchData();
  }, [listItems, list_id]);

  const getFirstOptionValue = () => {
    const firstOption = document.querySelector(
      ".newItem .itemCategory option:first-child"
    );
    return firstOption ? firstOption.value : "";
  };

  const handleItemChange = async (itemId, field, value) => {
    try {
      const updateResponse = await fetch(
        "http://localhost/pem-api/updateItem.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId,
            field,
            value,
          }),
        }
      );
      const data = await updateResponse.json();
      if (data) {
        listItems();
      } else {
        alert("Error! Try again...");
      }
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  const handleToggleDone = async (itemId, value) => {
    const newDone = value === "1" ? "0" : "1";

    try {
      await handleItemChange(itemId, "done", newDone);
    } catch (error) {
      console.error("Error toggling item done", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const updateResponse = await fetch(
        "http://localhost/pem-api/deleteItem.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId,
          }),
        }
      );
      const data = await updateResponse.json();
      if (data) {
        listItems();
      } else {
        alert("Error! Try again...");
      }
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const newItem = async () => {
    try {
      const insertResponse = await fetch(
        "http://localhost/pem-api/createItem.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: document.querySelector(".newItem .itemName").value,
            quantity: document.querySelector(".newItem .itemQuantity").value,
            price: document.querySelector(".newItem .itemPrice").value,
            list_id: list_id,
            item_cat_id: itemCategory || getFirstOptionValue(),
          }),
        }
      );
      await listItems();
      const data = await insertResponse.json();
      if (data) {
        listItems();
        document.querySelector(".newItem .itemName").value = "";
        document.querySelector(".newItem .itemQuantity").value = "";
        document.querySelector(".newItem .itemPrice").value = "";
      } else {
        alert("Error! Try again...");
      }
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

  const sortedItems = [...updatedItems].sort((a, b) => a.done - b.done);

  return (
    <div className="listItems">
      <div className="labels">
        <span>Name</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Category</span>
      </div>
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleToggleDone={handleToggleDone}
          handleItemChange={handleItemChange}
          deleteItem={deleteItem}
          list_category={list_category}
        />
      ))}
      <div className="newItem">
        <FaPlus className="plus" />
        <input type="text" className="itemName" />
        <input type="number" className="itemQuantity" />
        <input type="number" className="itemPrice" />
        <select
          className="itemCategory"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <ItemCategories list={list_category} />
        </select>
        <FaCheck className="check" onClick={newItem} />
      </div>
    </div>
  );
};

export default Items;
