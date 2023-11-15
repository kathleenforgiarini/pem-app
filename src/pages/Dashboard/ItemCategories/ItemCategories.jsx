import React, { useState, useEffect } from "react";

const ItemCategories = (props) => {
  const [categoriesItem, setCategoriesItem] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost/pem-api/itemCategories.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ list: props.list }),
          }
        );
        const data = await response.json();
        setCategoriesItem(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchCategories();
  }, [props]);

  return (
    <>
      {categoriesItem.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </>
  );
};

export default ItemCategories;
