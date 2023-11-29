import React from "react";
import { FaRegSquare, FaRegCheckSquare, FaTimes } from "react-icons/fa";
import ItemCategories from "../ItemCategories/ItemCategories";

const Item = ({
  item,
  handleToggleDone,
  handleItemChange,
  deleteItem,
  list_category,
}) => (
  <div className={item.done === 0 ? "item" : "completedItem"}>
    {item.done === 0 ? (
      <FaRegSquare
        className="square"
        onClick={() => handleToggleDone(item.id, item.done)}
      />
    ) : (
      <FaRegCheckSquare
        className="square"
        onClick={() => handleToggleDone(item.id, item.done)}
      />
    )}
    <input
      type="text"
      value={item.name}
      className="itemName"
      onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
    />
    <input
      type="text"
      value={item.quantity}
      className="itemQuantity"
      onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
    />
    <input
      type="text"
      value={item.price}
      className="itemPrice"
      onChange={(e) => handleItemChange(item.id, "price", e.target.value)}
    />
    <select
      className="itemCategory"
      value={item.item_cat_id}
      onChange={(e) => handleItemChange(item.id, "item_cat_id", e.target.value)}
    >
      <ItemCategories list={list_category} />
    </select>
    <FaTimes className="times" onClick={() => deleteItem(item.id)} />
  </div>
);

export default Item;
