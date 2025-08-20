import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrarPonto from './pages/RegistrarPonto.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import AreaAdmin from './pages/AreaAdmin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx'
import Conta from './pages/Conta.jsx';
import SeusPontos from './pages/SeusPontos.jsx';

function App() {

  return (
    <Router>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/registrar-ponto" element={<RegistrarPonto />} />
              <Route path="/seus-pontos" element={<SeusPontos />} />
              <Route path="/solicitacoes" />
              <Route path="/conta" element={<Conta />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole={'ADMIN'}/>}>
              <Route path="/area-admin" element={<AreaAdmin />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default App