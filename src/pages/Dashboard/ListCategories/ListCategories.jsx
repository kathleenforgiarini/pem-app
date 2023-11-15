import React, { useState, useEffect } from "react";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost/pem-api/listCategories.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ list_cat_id: 0 }),
          }
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchCategories();
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
