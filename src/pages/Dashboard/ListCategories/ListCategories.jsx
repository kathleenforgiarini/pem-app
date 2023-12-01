import React, { useState, useEffect } from "react";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost/pem-api/manageListCategories.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ list_cat_id: "" }),
          }
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error", error);
      }
    })();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </>
  );
};

export default ListCategories;
