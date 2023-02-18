import { BarLoader } from "react-spinners";
import { useState } from "react";
import "../styles/Table.css";

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);

  function clicked() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }
  return (
    <table className="table">
      <caption>Lesson Plans</caption>
      <th>Lesson Plan Title</th>
      <th>Date</th>
      <th>Status/View</th>
      <tr>
        <td>Title</td>
        <td>Date</td>
        {isLoading ? (
          <td>
            <BarLoader />
          </td>
        ) : (
          <td>
            <button onClick={clicked}>Click me!</button>
          </td>
        )}
      </tr>
    </table>
  );
};

export default Table;
