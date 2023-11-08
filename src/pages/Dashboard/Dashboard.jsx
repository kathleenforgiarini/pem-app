import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Dashboard.css";
import { FaPlus } from "react-icons/fa";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewListClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <NavBar />
      <section id="dashboard">
        <div id="headerLists">
          <button
            type="button"
            className="newList"
            onClick={handleNewListClick}
          >
            New list <FaPlus className="plus" />
          </button>
          <div className="searchLists">
            <select name="" id="">
              <option value="All categories">All categories</option>
            </select>
            <input type="text" placeholder="Search" />
          </div>
          <p className="totalLists">$8000</p>
        </div>
        <div id="lists">
          <h1>My Lists</h1>
        </div>
      </section>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h1>New list</h1>
            <input type="text" placeholder="Nome" />
            <textarea type="text" placeholder="Descrição"></textarea>
            <select name="" id="">
              <option value="Category">Category</option>
            </select>
            <input type="number" placeholder="Maximum price" />
            <div className="buttons">
              <button onClick={handleModalClose}>Save</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;
