// Items.js
import React, { useState, useEffect } from "react";
import "./Items.css";
import { FaCheck, FaPlus } from "react-icons/fa";
import ItemCategories from "../ItemCategories/ItemCategories";
import Item from "./Item";

const Items = ({ list_id, list_category }) => {
  const [updatedItems, setUpdatedItems] = useState([]);
  const [item, setItem] = useState({
    name: "",
    quantity: "",
    price: "",
    list_id: list_id,
    category: 1,
  });

  useEffect(() => {
    const itensList = async () => {
      try {
        const itemsResponse = await fetch("http://localhost/pem-api/item.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list_id: list_id }),
        });
        const items = await itemsResponse.json();
        setUpdatedItems(items);
      } catch (error) {
        console.error("Error", error);
      }
    };

    itensList();
  }, [list_id]);

  const listItems = async () => {
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
          body: JSON.stringify(item),
        }
      );
      const data = await insertResponse.json();
      if (data) {
        setItem({
          name: "",
          quantity: "",
          price: "",
          list_id: "",
          category: 1,
        });
        listItems();
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
        <input
          type="hidden"
          value={list_id}
          onChange={(e) => setItem({ ...item, list_id: e.target.value })}
        />
        <input
          type="text"
          className="itemName"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
        <input
          type="number"
          className="itemQuantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
        <input
          type="number"
          className="itemPrice"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
        />
        <select
          className="itemCategory"
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value })}
        >
          <ItemCategories list={list_category} />
        </select>
        <FaCheck className="check" onClick={newItem} />
      </div>
    </div>
  );
};

export default Items;
