import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from './Pages/MainMenu';
import React, { useState } from 'react';
import axios from 'axios';
import Techniques from "./Pages/Techniques";
import PomodoroTimer from "./Pages/Techniques/PomodoroTimer";

function App() {
  function post_data(){
    const url = 'http://127..0.1:5000/api'
      axios.post(url, {
        name: '',
        email: ''
      })
      .then(response => {})
      .catch(error => {
        console.error('Error sending data:', error);
      })
  }

  function get_data() {
    const url = 'http://127..0.1:5000/api'
      axios.get(url)
        .then(response => {
         //Setting the variable : setVariable(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainMenu />} />
          <Route path="Dashboard" element={<Dashboard/>} />
          <Route path="Techniques" element={<Techniques/>}>
            <Route path="Pomodoro" element={<PomodoroTimer />} />
            <Route path="Blurting" element={<Blurting />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
