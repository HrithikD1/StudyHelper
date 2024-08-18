import React, { useEffect, useState } from "react";
import "./Styles/Timetable.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import pb from "../pocketbase";

export default function Timetable() {
  const [data, setData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isTimetableVisible, setIsTimetableVisible] = useState(true);
  const userId = pb.authStore.model?.id; // Assuming user is already logged in

  useEffect(() => {
    if (userId) {
      pb.collection("timetables")
        .getFullList(1, {
          filter: `userId = "${userId}"`,
        })
        .then((response) => {
          if (response.length === 0) {
            // No timetable exists, create a default one
            const defaultTimetable = {
              userId: userId,
              data: [
                { Subject: "Math", Time: "09:00 AM", End: "10:00 AM" },
                { Subject: "Science", Time: "10:00 AM", End: "11:00 AM" },
              ],
            };
            pb.collection("timetables").create(defaultTimetable).then(() => {
              setData(defaultTimetable.data);
            });
          } else {
            setData(response[0]?.data || []);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [userId]);

  const handleEditClick = () => {
    if (isEditable) {
      if (userId) {
        pb.collection("timetables")
          .update(data.id, { data })
          .then(() => {
            console.log("Changes saved successfully");
            setIsEditable(false);
            setIsTimetableVisible(false);
          })
          .catch((error) => console.error("Error saving changes:", error));
      }
    } else {
      setIsEditable(true);
    }
  };

  const handleToggleTimetable = () => {
    setIsTimetableVisible(!isTimetableVisible);
    setIsEditable(false);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const addRow = () => {
    setData([...data, { Subject: "", Time: "", End: "" }]);
  };

  const removeRow = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div className="timetable-container">
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
            {isEditable && <button onClick={addRow}>Add Row</button>}
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
                    <th>Actions</th>
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
                      <td>
                        <button onClick={() => removeRow(index)}>Remove Row</button>
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
