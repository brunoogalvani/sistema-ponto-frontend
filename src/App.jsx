import React from 'react';
import RegistrarPonto from './pages/RegistrarPonto/RegistrarPonto.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx';
import AreaAdmin from './pages/AreaAdmin/AreaAdmin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'

function App() {

  return (
    <Router>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/registrar-ponto" element={<RegistrarPonto />} />
              <Route path="/seus-pontos"></Route>
              <Route path="/solicitacoes"></Route>
            </Route>

            <Route element={<ProtectedRoute requiredRole={'ADMIN'}/>}>
              <Route path="/area-admin" element={<AreaAdmin />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App