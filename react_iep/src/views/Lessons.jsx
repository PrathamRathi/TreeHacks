import { useEffect } from "react";
import axios from "axios";
import { Table } from "../components";
import "../styles/Lessons.css";

const Lessons = () => {
  return (
    <div className="lessons">
      <Table />
    </div>
  );
};

export default Lessons;
