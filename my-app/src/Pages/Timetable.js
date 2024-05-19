import React, { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

// Styled components
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }

  &.delete {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }

  svg {
    margin-right: 5px;
  }
`;

const Timetable = () => {
  const initialTableData = {
    weekdays: [
      ["Period", "8:00", "9:00", "10:00"],
      ["Monday", "", "", ""],
      ["Tuesday", "", "", ""],
      ["Wednesday", "", "", ""],
      ["Thursday", "", "", ""],
    ],
    friday: [
      ["Period", "8:00", "9:00", "10:00"],
      ["Friday", "", "", ""],
    ],
  };

  const [tableData, setTableData] = useState(initialTableData);
  const [tables, setTables] = useState([]);
  const [tableLabels, setTableLabels] = useState([]);

  useEffect(() => {
    fetchTables();
    fetchTableLabels();
  }, []);

  const fetchTables = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tables"));
      const fetchedTables = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTables(fetchedTables);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const fetchTableLabels = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "table_labels"));
      const fetchedLabels = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTableLabels(fetchedLabels);
    } catch (error) {
      console.error("Error fetching table labels:", error);
    }
  };

  const addTable = async () => {
    try {
      const newTableRef = doc(collection(db, "tables"));
      await setDoc(newTableRef, initialTableData);
      setTables([...tables, initialTableData]);
    } catch (error) {
      console.error("Error adding table:", error);
    }
  };

  const deleteTable = async (index) => {
    try {
      const tableRef = doc(collection(db, "tables"), tables[index].id);
      await deleteDoc(tableRef);
      const updatedTables = [...tables];
      updatedTables.splice(index, 1);
      setTables(updatedTables);
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  };

  const updateTableLabel = async (index, newLabel) => {
    try {
      const labelRef = doc(collection(db, "table_labels"), tableLabels[index].id);
      await setDoc(labelRef, { label: newLabel });
      const updatedLabels = [...tableLabels];
      updatedLabels[index].label = newLabel;
      setTableLabels(updatedLabels);
    } catch (error) {
      console.error("Error updating table label:", error);
    }
  };

  const handleCellValueChange = async (day, rowIndex, colIndex, value) => {
    try {
      const updatedData = { ...tableData };
      updatedData[day][rowIndex][colIndex] = value;
      setTableData(updatedData);
      const docRef = doc(db, "timetable", "timetable");
      await setDoc(docRef, updatedData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const addColumn = (day) => {
    const newData = { ...tableData };
    newData[day][0].push("");
    for (let i = 1; i < newData[day].length; i++) {
      newData[day][i].push("");
    }
    setTableData(newData);
    updateFirestore(newData);
  };

  const addRow = (day) => {
    const newData = { ...tableData };
    const newRow = Array(newData[day][0].length).fill("");
    newData[day].push(newRow);
    setTableData(newData);
    updateFirestore(newData);
  };

  const deleteColumn = (day, colIndex) => {
    const newData = { ...tableData };
    newData[day][0].splice(colIndex, 1);
    for (let i = 1; i < newData[day].length; i++) {
      newData[day][i].splice(colIndex, 1);
    }
    setTableData(newData);
    updateFirestore(newData);
  };

  const deleteRow = (day, rowIndex) => {
    const newData = { ...tableData };
    newData[day].splice(rowIndex, 1);
    setTableData(newData);
    updateFirestore(newData);
  };

  const updateFirestore = async (data) => {
    try {
      const docRef = doc(db, "timetable", "timetable");
      await setDoc(docRef, data);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <main>
      <h1>Timetable</h1>
      <section>
        <h2>Table Labels</h2>
        <div>
          {tableLabels.map((label, index) => (
            <div key={index}>
              <input
                type="text"
                value={label.label}
                onChange={(e) => updateTableLabel(index, e.target.value)}
              />
              <Button className="delete" onClick={() => deleteTable(index)}>
                <AiOutlineClose /> Delete Table
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={addTable}>
          <AiOutlinePlus /> Add Table
        </Button>
      </section>
      <section>
        <h2>Tables</h2>
        {tables.map((table, index) => (
          <div key={index}>
            <h3>Table {index + 1}</h3>
            <Button className="delete" onClick={() => deleteTable(index)}>
              <AiOutlineClose /> Delete Table
            </Button>
            <div style={{ marginBottom: "10px" }}>
              <Button onClick={() => addColumn("weekdays")}>
                <AiOutlinePlus /> Add Column
              </Button>
              <Button onClick={() => addRow("weekdays")}>
                <AiOutlinePlus /> Add Row
              </Button>
            </div>
            <table style={{ borderCollapse: "collapse", border: "2px solid #ccc", marginBottom: "20px", width: "100%" }}>
              <tbody>
                {tableData.weekdays.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          backgroundColor: rowIndex === 0 ? "#f0f0f0" : "white",
                        }}
                      >
                        <input
                          style={{ width: "80px", border: "none", backgroundColor: "inherit" }}
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellValueChange("weekdays", rowIndex, colIndex, e.target.value)}
                        />
                      </td>
                    ))}
                    <td style={{ border: "none", backgroundColor: rowIndex === 0 ? "#f0f0f0" : "white", textAlign: "center" }}>
                      {rowIndex === 0 ? (
                        ""
                      ) : (
                        <Button className="delete" onClick={() => deleteRow("weekdays", rowIndex)}>
                          <AiOutlineClose /> Delete Row
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {tableData.weekdays[0].map((cell, colIndex) => (
                <Button key={colIndex} className="delete" onClick={() => deleteColumn("weekdays", colIndex)}>
                  <AiOutlineClose /> Delete Column
                </Button>
              ))}
            </div>
            <section>
              <h2>Friday</h2>
              <div style={{ marginBottom: "10px" }}>
                <Button onClick={() => addColumn("friday")}>
                  <AiOutlinePlus /> Add Column
                </Button>
                <Button onClick={() => addRow("friday")}>
                  <AiOutlinePlus /> Add Row
                </Button>
              </div>
              <table style={{ borderCollapse: "collapse", border: "2px solid #ccc", marginBottom: "20px", width: "100%" }}>
                <tbody>
                  {tableData.friday.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            backgroundColor: rowIndex === 0 ? "#f0f0f0" : "white",
                          }}
                        >
                          <input
                            style={{ width: "80px", border: "none", backgroundColor: "inherit" }}
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellValueChange("friday", rowIndex, colIndex, e.target.value)}
                          />
                        </td>
                      ))}
                      <td style={{ border: "none", backgroundColor: rowIndex === 0 ? "#f0f0f0" : "white", textAlign: "center" }}>
                        {rowIndex === 0 ? (
                          ""
                        ) : (
                          <Button className="delete" onClick={() => deleteRow("friday", rowIndex)}>
                            <AiOutlineClose /> Delete Row
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                {tableData.friday[0].map((cell, colIndex) => (
                  <Button key={colIndex} className="delete" onClick={() => deleteColumn("friday", colIndex)}>
                    <AiOutlineClose /> Delete Column
                  </Button>
                ))}
              </div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Timetable;
