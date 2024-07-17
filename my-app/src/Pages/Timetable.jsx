import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Timetable() {
  const [data, setData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);

  useEffect(() => {
    axios.get("/backend")
      .then(response => {
        setData(response.data); // Assuming the backend returns the data correctly
      })
      .catch(error => console.error(error));
  }, []);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
    setIsViewMode(false); // Ensure view mode is off when switching to edit mode
  };

  const handleViewClick = () => {
    setIsViewMode(!isViewMode);
    setIsEditable(false); // Ensure edit mode is off when switching to view mode
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  return (
    <div className="App">
      <h1>Timetable</h1>
      <div>
        <button onClick={handleViewClick}>
          {isViewMode ? "Hide Timetable" : "View Timetable"}
        </button>
        <button onClick={handleEditClick} disabled={!isViewMode}>
          {isEditable ? "Save Changes" : "Edit Timetable"}
        </button>
      </div>
      {isViewMode && (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Subject}</td>
                <td>{item.Time}</td>
                <td>{item.End}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isEditable && (
        <div>
          <h2>Edit Timetable</h2>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.Subject}
                      onChange={(e) => handleInputChange(index, "Subject", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.Time}
                      onChange={(e) => handleInputChange(index, "Time", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.End}
                      onChange={(e) => handleInputChange(index, "End", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
