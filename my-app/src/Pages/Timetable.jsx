import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Timetable.css"; // Import the CSS file
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Import arrow icons

export default function Timetable() {
  const [data, setData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isTimetableVisible, setIsTimetableVisible] = useState(true); // State to control timetable visibility

  useEffect(() => {
    axios.get("/backend")
      .then(response => {
        setData(response.data); // Assuming the backend returns the data correctly
      })
      .catch(error => console.error(error));
  }, []);

  const handleEditClick = () => {
    if (isEditable) {
      // Save changes if in edit mode
      axios.post("/backend", data)
        .then(response => {
          console.log("Changes saved successfully");
          setIsEditable(false);
          setIsTimetableVisible(false); // Hide timetable after saving changes
        })
        .catch(error => console.error("Error saving changes:", error));
    } else {
      setIsEditable(true);
    }
  };

  const handleToggleTimetable = () => {
    setIsTimetableVisible(!isTimetableVisible); // Toggle timetable visibility
    setIsEditable(false); // Ensure edit mode is off when toggling timetable visibility
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  return (
    <div className="timetable-container">
      {/* Menu Icon Button */}
      <button className="menu-button" onClick={handleToggleTimetable}>
        {isTimetableVisible ? <FaArrowLeft className="menu-icon" /> : <FaArrowRight className="menu-icon" />}
      </button>
      
      {isTimetableVisible && (
        <div className="timetable-content">
          <h1>Timetable</h1>
          <div className="buttons-container">
            <button onClick={handleEditClick}>
              {isEditable ? "Save Changes" : "Edit Timetable"}
            </button>
          </div>
          {isEditable ? (
            <div className="edit-section">
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
          ) : (
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
        </div>
      )}
    </div>
  );
}
