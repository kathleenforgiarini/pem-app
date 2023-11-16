import React, { useState, useEffect } from "react";
import "./Items.css";
import {
  FaRegSquare,
  FaTimes,
  FaRegCheckSquare,
  FaCheck,
  FaPlus,
} from "react-icons/fa";
import ItemCategories from "../ItemCategories/ItemCategories";

const Items = ({ items, list_category }) => {
  const [updatedItems, setUpdatedItems] = useState(items);

  useEffect(() => {
    setUpdatedItems(items);
  }, [items]);

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
            itemId: itemId,
            field: field,
            value: value,
          }),
        }
      );
      const data = await updateResponse.json();
      if (data) {
        listItems();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleToggleDone = async (itemId, value) => {
    const newDone = value === "1" ? "0" : "1";

    try {
      handleItemChange(itemId, "done", newDone);
    } catch (error) {
      console.error("Error", error);
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
            itemId: itemId,
          }),
        }
      );
      const data = await updateResponse.json();
      if (data) {
        listItems();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState(1);

  const listItems = async () => {
    try {
      const itemsResponse = await fetch("http://localhost/pem-api/item.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list_id: 1 }),
      });
      const itemsCountData = await itemsResponse.json();
      setUpdatedItems(itemsCountData);
    } catch (error) {
      console.error("Error listing items", error);
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
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
            category: itemCategory,
          }),
        }
      );
      const data = await insertResponse.json();
      if (data) {
        setItemName("");
        setItemQuantity("");
        setItemPrice("");
        setItemCategory(1);
        listItems();
      }
    } catch (error) {
      console.error("Error", error);
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
        <div key={item.id} className="bothItems">
          {item.done === "0" ? (
            <div className="item">
              <FaRegSquare
                className="square"
                onClick={() => handleToggleDone(item.id, item.done)}
              />
              <input
                type="text"
                value={item.name}
                className="itemName"
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
              />
              <input
                type="text"
                value={item.quantity}
                className="itemQuantity"
                onChange={(e) =>
                  handleItemChange(item.id, "quantity", e.target.value)
                }
              />
              <input
                type="text"
                value={item.price}
                className="itemPrice"
                onChange={(e) =>
                  handleItemChange(item.id, "price", e.target.value)
                }
              />

              <select
                className="itemCategory"
                value={item.item_cat_id}
                onChange={(e) =>
                  handleItemChange(item.id, "item_cat_id", e.target.value)
                }
              >
                <ItemCategories list={list_category} />
              </select>
              <FaTimes className="times" onClick={() => deleteItem(item.id)} />
            </div>
          ) : (
            <div className="completedItem">
              <FaRegCheckSquare
                className="square"
                onClick={() => handleToggleDone(item.id, item.done)}
              />
              <input
                type="text"
                value={item.name}
                className="itemName"
                onChange={(e) =>
                  handleItemChange(item.id, "name", e.target.value)
                }
              />
              <input
                type="text"
                value={item.quantity}
                className="itemQuantity"
                onChange={(e) =>
                  handleItemChange(item.id, "quantity", e.target.value)
                }
              />
              <input
                type="text"
                value={item.price}
                className="itemPrice"
                onChange={(e) =>
                  handleItemChange(item.id, "price", e.target.value)
                }
              />

              <select
                className="itemCategory"
                value={item.item_cat_id}
                onChange={(e) =>
                  handleItemChange(item.id, "item_cat_id", e.target.value)
                }
              >
                <ItemCategories list={list_category} />
              </select>
              <FaTimes className="times" onClick={() => deleteItem(item.id)} />
            </div>
          )}
        </div>
      ))}
      <div className="newItem">
        <FaPlus className="plus" />
        <input
          type="text"
          className="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          className="itemQuantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <input
          type="text"
          className="itemPrice"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <select
          className="itemCategory"
          value={itemCategory ? itemCategory : 1}
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
