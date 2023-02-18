import { BarLoader } from "react-spinners";
import { useState } from "react";
import "../styles/Table.css";

const TableItem = () => {
  const [isLoading, setIsLoading] = useState(false);

  function clicked() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }

  return (
    <div className="tableRow">
      <div className="lessonPlan">
        <h1>Title</h1>
        <p>This is the lesson plan description</p>
      </div>
      <div className="view">
        {isLoading ? (
          <td className="cell">
            <BarLoader />
          </td>
        ) : (
          <td>
            <button onClick={clicked}>Click me!</button>
          </td>
        )}
      </div>
    </div>
  );
};

const Table = () => {
  return (
    <div className="table">
      <TableItem />
      <TableItem />
      <TableItem />
    </div>
  );
};

export default Table;
