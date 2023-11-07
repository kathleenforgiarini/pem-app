import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Dashboard.css";
import { FaPlus, FaSearch } from "react-icons/fa";

function Dashboard() {
  return (
    <div>
      <NavBar />
      <section id="dashboard">
        <div id="headerLists">
          <button type="button" className="newList">
            New list <FaPlus className="plus" />
          </button>
          <div className="searchLists">
            <select name="" id="">
              <option value="All categories">All categories</option>
            </select>
            <input type="text" placeholder="Search" />
            <button type="button">
              <FaSearch />
            </button>
          </div>
          <p className="totalLists">$8000</p>
        </div>
        <div id="lists">
          <h1>My Lists</h1>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
