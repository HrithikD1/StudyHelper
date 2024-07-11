import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Timetable(){
    const [data, setData] = useState();
    useEffect(() => {
        axios.get("/backend")
        .then(response => setData(response.data))
        .catch(error => console.error(error))
    })
    return(
        <></>
    )
}