import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Parse JWT token payload
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if user role is admin (if backend includes it in token)
    // If not, we rely on backend permission checks
    if (payload.role && payload.role !== "admin") {
      return <Navigate to="/" />;
    }
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
