import React, { useState, useEffect } from "react";
import userPhoto from "../../../../assets/userPhoto.png";

const ShareList = (listId) => {
  const [sharedWith, setSharedWith] = useState([]);

  const sharedWithList = async () => {
    try {
      const responseShared = await fetch(
        "http://localhost/pem-api/manageShareLists.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ operation: "select", list: listId.listId }),
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
          "http://localhost/pem-api/manageShareLists.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              operation: "delete",
              userId: userId,
              listId: listId,
            }),
          }
        );

        const data = await responseShared.json();
        if (data === "success") {
          sharedWithList();
        } else {
          alert("An error occurred, try again!");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <div className="shareFunction">
      <div className="sharedWith">
        {sharedWith.map((itemShare, indexShare) =>
          itemShare.photo ? (
            <img
              key={indexShare}
              id={itemShare.id}
              src={`data:image/png;base64,${itemShare.photo}`}
              title={itemShare.name}
              alt={itemShare.name}
              onClick={() =>
                handleClickShareWith(
                  itemShare.id,
                  listId.listId,
                  itemShare.name
                )
              }
            />
          ) : (
            <img
              key={indexShare}
              id={itemShare.id}
              src={userPhoto}
              title={itemShare.name}
              alt={itemShare.name}
              onClick={() =>
                handleClickShareWith(
                  itemShare.id,
                  listId.listId,
                  itemShare.name
                )
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default ShareList;
