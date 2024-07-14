import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Timetable(){
    const [data, setData] = useState();

    useEffect(() => {
        axios.get("/backend")
        .then(response => setData(response.data))
        .then(console.log(data))
        .catch(error => console.error(error))
    }, [])

    return(
        <div className="App">
        <h1>Timetable</h1>
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
                <td>{item.subject}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}