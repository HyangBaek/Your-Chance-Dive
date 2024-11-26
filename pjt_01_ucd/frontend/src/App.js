// Route 기능만 수행합니다.
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainController from './controller/MainController';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/*" element={<MainController user={user} setUser={setUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
