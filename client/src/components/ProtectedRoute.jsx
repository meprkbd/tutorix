import AppLayout from "./layout/AppLayout";
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = true;
  const loading = false;

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
