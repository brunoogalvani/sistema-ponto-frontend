import React from 'react';
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register.jsx';

function App() {

  return (
    <Router>
        <Routes>
            <Route index element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    </Router>
  )
}

export default App