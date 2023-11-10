import "./Modal.css";
import ListCategories from "../ListCategories/ListCategories";

const Modal = ({ isModalOpen, handleModalClose }) => {
  const handleModalCloseLocal = () => {
    handleModalClose(false);
  };

  return (
    isModalOpen && (
      <div className="modalOverlay">
        <div className="modalContent">
          <h1>New list</h1>
          <input type="text" placeholder="Nome" />
          <textarea type="text" placeholder="Descrição"></textarea>
          <select name="" id="">
            <option value="">Select a category</option>
            <ListCategories />
          </select>
          <input type="number" placeholder="Maximum price" />
          <div className="buttons">
            <button onClick={handleModalCloseLocal}>Save</button>
            <button onClick={handleModalCloseLocal}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
