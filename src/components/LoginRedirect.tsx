import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginRedirect() {
  const token = Cookies.get('token');

  // ถ้ามี token และพยายามเข้า /login
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // ดำเนินการต่อไปยัง /login
}