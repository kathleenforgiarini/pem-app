import React, { useState, useEffect, useCallback } from "react";
import "./Lists.css";
import List from "./List";

const Lists = ({ userId, calculateTotalPriceAllLists }) => {
  const [updatedLists, setUpdatedLists] = useState([]);
  const [totalPriceList, setTotalPriceList] = useState(0);

  const listLists = useCallback(async () => {
    try {
      const response = await fetch("http://localhost/pem-api/list.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const listData = await response.json();
      setUpdatedLists(listData);
    } catch (error) {
      console.error("Error listing items", error);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/pem-api/list.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });
        const listData = await response.json();
        setUpdatedLists(listData);
      } catch (error) {
        console.error("Error", error);
      }

      listLists();
    };

    fetchData();
  }, [listLists, userId]);

  useEffect(() => {
    // Calcula o preço total de todas as listas
    const totalPrice = updatedLists.reduce(
      (accumulator, list) => accumulator + parseFloat(list.total_price),
      0
    );

    // Atualiza o preço total no estado
    setTotalPriceList(totalPrice);

    // Chama a função de callback, se necessário
    calculateTotalPriceAllLists(totalPriceList);
  }, [updatedLists]);

  return (
    <div className="listsUser">
      {updatedLists.map((list) => (
        <List key={list.id} list={list} listLists={listLists} />
      ))}
    </div>
  );
};

export default Lists;
