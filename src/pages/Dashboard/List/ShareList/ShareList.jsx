import React, { useState, useEffect } from "react";

const ShareList = (listId) => {
  const [sharedWith, setSharedWith] = useState([]);

  const sharedWithList = async () => {
    try {
      const responseShared = await fetch(
        "http://localhost/pem-api/shareList.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ list: listId.listId }),
        }
      );

      const data = await responseShared.json();
      setSharedWith(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    sharedWithList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const handleClickShareWith = async (userId, listId, userName) => {
    const deleteUser = window.confirm(
      "Do you want to remove access of the list for " + userName + "?"
    );
    if (deleteUser) {
      try {
        const responseShared = await fetch(
          "http://localhost/pem-api/deleteShareWith.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId, listId: listId }),
          }
        );

        const data = await responseShared.json();
        if (data) {
          sharedWithList();
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <div className="shareFunction">
      <div className="sharedWith">
        {sharedWith.map((itemShare, indexShare) => (
          <img
            key={indexShare}
            id={itemShare.id}
            src={`data:image/png;base64,${itemShare.photo}`}
            title={itemShare.name}
            alt={itemShare.name}
            onClick={() =>
              handleClickShareWith(itemShare.id, listId.listId, itemShare.name)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ShareList;
