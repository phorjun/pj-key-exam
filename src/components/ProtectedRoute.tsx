import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = Cookies.get('token');

  // ถ้าไม่มี token และพยายามเข้าหน้าอื่นนอกจาก /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ดำเนินการต่อไปยังหน้าเด็ก (เช่น /dashboard)
}