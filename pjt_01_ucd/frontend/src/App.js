// Route 기능만 수행합니다.
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainController from './controller/MainController';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainController user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
