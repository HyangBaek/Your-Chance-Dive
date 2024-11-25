// Route 기능만 수행합니다.
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import ItemForm from "./components/ItemForm"; // item 등록
import ItemDetail from "./components/ItemDetail"; // item 조회
import AboutPage from "./components/AboutPage";
import SearchPage from './components/SearchPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Main user={user} setUser={setUser} />} />
            <Route
              path="/register"
              element={<Register onRegister={(data) => setUser(data)} />}
            />
            <Route
              path="/login"
              element={<Login onLogin={(data) => setUser(data)} />}
            />
            <Route path="/items/:id" element={<ItemDetail user={user} />} />
            <Route path="/additem" element={<ItemForm user={user} />} />
            <Route
              path="/mypage"
              element={<MyPage user={user} setUser={setUser} />}
            />
            <Route path="/search" element={<SearchPage user={user} setUser={setUser} />} />
            <Route path="/introduce" element={<AboutPage />} />{" "}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
