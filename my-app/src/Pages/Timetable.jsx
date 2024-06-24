import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

function Timetable() {
  const [tableData, setTableData] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mockdata');
        const data = response.data.map((row) => Object.values(row));
        setTableData([Object.keys(response.data[0]), ...data]);
      } catch (error) {
        console.error('Error fetching mock data', error);
      }
    };

    fetchMockData();
  }, []);

  const handleCellChange = (rowIndex, columnIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][columnIndex] = value;
    setTableData(newData);
    setIsEdited(true);
  };

  const handleFileSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/download', { tableData });
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'edited_file.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving the file', error);
    }
  };

  return (
    <div>
      <h1>CSV Editor</h1>
      {tableData.length > 0 && (
        <table>
          <thead>
            <tr>
              {tableData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex + 1, columnIndex, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isEdited && (
        <button onClick={handleFileSave}>
          Save Edited CSV
        </button>
      )}
      <CSVLink data={tableData} filename={"edited_file.csv"} className="hidden" />
    </div>
  );
}

export default Timetable;
