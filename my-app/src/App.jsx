import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from './Pages/MainMenu';
import React, { useState } from 'react';
import Techniques from "./Pages/Techniques";
import PomodoroTimer from "./Pages/Techniques/PomodoroTimer";
import Notes from "./Pages/Notes";
import Blurting from "./Pages/Techniques/BlurtingTechnique";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainMenu />} />
          <Route path="Dashboard" element={<Dashboard/>} />
          <Route path="Notes" element={<Notes />} />
          <Route path="Techniques" element={<Techniques/>}>
            <Route path="Pomodoro" element={<PomodoroTimer />} />
            <Route path="Blurting" element={<Blurting />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
