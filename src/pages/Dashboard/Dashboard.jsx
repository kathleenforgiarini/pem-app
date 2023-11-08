import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Modal from "./Modal/Modal";
import ListCategories from "./ListCategories/ListCategories";
import "./Dashboard.css";
import { FaPlus } from "react-icons/fa";

const Dashboard = ({ changePage }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewListClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar changePage={changePage} />
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
            <select
              name="categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All categories</option>
              <ListCategories />
            </select>
            <input type="text" placeholder="Search" />
          </div>
          <p className="totalLists">$8000</p>
        </div>
        <div className="lists">
          <div className="myLists">
            <h1>My Lists</h1>
          </div>

          <div className="sharedLists">
            <h1>Shared with me</h1>
          </div>
        </div>
      </section>

      <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose} />

      <Footer />
    </div>
  );
};

export default Dashboard;
