import { useState } from "react";
import "./Modal.css";
import ListCategories from "../ListCategories/ListCategories";

const Modal = ({ isModalOpen, handleModalClose, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    list_cat_id: "",
    max_price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost/pem-api/manageLists.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: "create",
          name: formData.name,
          description: formData.description,
          list_cat_id: formData.list_cat_id,
          max_price: formData.max_price,
          user_id: userId,
        }),
      });

      const data = await response.json();
      if (data) {
        alert(data);
        window.location.reload();
        handleModalClose(false);
      } else {
        alert("Something went wrong, try again...");
      }
    } catch (error) {
      console.error("Erro ao salvar a lista", error);
    }
  };

  const handleModalCloseLocal = () => {
    handleModalClose(false);
  };

  return (
    isModalOpen && (
      <div className="modalOverlay">
        <div className="modalContent">
          <h1>New list</h1>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
          <select
            name="list_cat_id"
            value={formData.list_cat_id}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <ListCategories />
          </select>
          <input
            type="number"
            placeholder="Maximum price"
            name="max_price"
            value={formData.max_price}
            onChange={handleInputChange}
          />
          <div className="buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleModalCloseLocal}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
