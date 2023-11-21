import React, { useState, useEffect, useCallback } from "react";
import "./Lists.css";
import List from "./List";

const Lists = ({
  sharedList,
  userId,
  selectedCategory,
  searchList,
  calculateTotalPriceAllLists,
}) => {
  const [updatedLists, setUpdatedLists] = useState([]);
  const [totalPriceList, setTotalPriceList] = useState(0);

  const listLists = useCallback(async () => {
    if (sharedList) {
      try {
        const response = await fetch(
          "http://localhost/pem-api/listShared.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              selectedCategory: selectedCategory,
              name: searchList,
            }),
          }
        );
        const listData = await response.json();
        setUpdatedLists(listData);
      } catch (error) {
        console.error("Error listing items", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost/pem-api/list.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            selectedCategory: selectedCategory,
            name: searchList,
          }),
        });
        const listData = await response.json();
        setUpdatedLists(listData);
      } catch (error) {
        console.error("Error listing items", error);
      }
    }
  }, [searchList, selectedCategory, sharedList, userId]);

  useEffect(() => {
    listLists();
  }, [listLists, userId, selectedCategory, searchList]);

  useEffect(() => {
    const totalPrice = updatedLists.reduce(
      (accumulator, list) => accumulator + parseFloat(list.total_price),
      0
    );

    setTotalPriceList(totalPrice);
    calculateTotalPriceAllLists(totalPriceList);
  }, [updatedLists]);

  return (
    <div className="listsUser">
      {updatedLists.map((list) => (
        <List
          key={list.id}
          list={list}
          listLists={listLists}
          sharedList={sharedList}
        />
      ))}
    </div>
  );
};

export default Lists;
