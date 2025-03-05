import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";

function ProtectedRoute({ requiredRole }) {
    const userId = sessionStorage.getItem('userId');
    const [userRole, setUserRole] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            api.get(`/users/${userId}`)
                .then(response => {
                    setUserRole(response.data.role);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar usuário", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userId]);

    if (loading) return <p>Carregando...</p>;

    if (!userId) return <Navigate to='/' />;

    if (requiredRole && userRole !== requiredRole) return <Navigate to='/home' />;

    return <Outlet />
}

export default ProtectedRoute;
