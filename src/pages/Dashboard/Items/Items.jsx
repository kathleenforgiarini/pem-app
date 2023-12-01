import React, { useState, useEffect, useCallback } from "react";
import "./Items.css";
import { FaCheck, FaPlus } from "react-icons/fa";
import ItemCategories from "../ItemCategories/ItemCategories";
import Item from "./Item";

const Items = ({ list_id, list_category, handleChildPrice }) => {
  const [updatedItems, setUpdatedItems] = useState([]);
  const [itemCategory, setItemCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const listItems = useCallback(async () => {
    try {
      const itemsResponse = await fetch(
        "http://localhost/pem-api/manageItems.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ operation: "select", list_id: list_id }),
        }
      );
      const itemsCountData = await itemsResponse.json();
      setUpdatedItems(itemsCountData);
      const select = document.getElementsByName("newItemCategory");
      setItemCategory(select[0].options[0].value);
    } catch (error) {
      console.error("Error listing items", error);
    }
  }, [list_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/pem-api/manageItems.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ operation: "select", list_id: list_id }),
          }
        );

        const data = await response.json();
        setUpdatedItems(data);
      } catch (error) {
        console.error("Error", error);
      }

      listItems();
    };

    fetchData();
  }, [listItems, list_id]);

  const calculateTotalPrice = useCallback(() => {
    const total = updatedItems.reduce((accumulator, item) => {
      return accumulator + parseFloat(item.price);
    }, 0);

    return total;
  }, [updatedItems]);

  useEffect(() => {
    const total = calculateTotalPrice();
    handleChildPrice(total);
  }, [calculateTotalPrice, handleChildPrice]);

  const handleItemChange = async (itemId, field, value) => {
    try {
      const updateResponse = await fetch(
        "http://localhost/pem-api/manageItems.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "update",
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
    const newDone = value === 1 ? 0 : 1;

    try {
      await handleItemChange(itemId, "done", newDone);
    } catch (error) {
      console.error("Error toggling item done", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const updateResponse = await fetch(
        "http://localhost/pem-api/manageItems.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "delete",
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
        "http://localhost/pem-api/manageItems.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operation: "create",
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
            list_id: list_id,
            item_cat_id: itemCategory,
          }),
        }
      );

      await listItems();
      const data = await insertResponse.json();
      if (data) {
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
          type="text"
          className="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          className="itemQuantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <input
          type="number"
          className="itemPrice"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        <select
          className="itemCategory"
          name="newItemCategory"
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
