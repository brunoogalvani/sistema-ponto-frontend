import React from 'react';
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole={'ADMIN'}/>}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App