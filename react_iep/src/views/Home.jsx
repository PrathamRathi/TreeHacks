import { useEffect } from "react";
import axios from "axios";
import { Modal, Table } from "../components";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <header>
        <h1>This will be the title</h1>
      </header>
      <Table />
      <footer>This is the footer</footer>
      {/* <Modal /> */}
    </div>
  );
};

export default Home;
