import React, { useState, useEffect } from "react";
import "./Items.css";
import {
  FaRegSquare,
  FaTimes,
  FaAngleDown,
  FaRegCheckSquare,
} from "react-icons/fa";
import ItemCategories from "../ItemCategories/ItemCategories";

const Items = ({ items, list_category }) => {
  const [updatedItems, setUpdatedItems] = useState(items);

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
        setUpdatedItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
          )
        );
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleToggleDone = async (itemId, value) => {
    const newDone = value === 1 ? 0 : 1;

    try {
      handleItemChange(itemId, "done", newDone);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="listItems">
      {updatedItems.map((item) => (
        <div key={item.id} className="bothItems">
          {item.done == 0 ? (
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
              <FaTimes className="times" />
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
              <FaTimes className="times" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Items;
