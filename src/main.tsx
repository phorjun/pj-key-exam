import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginRedirect from './components/LoginRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import LoginPage from './login/page'; // ปรับ path ตามโครงสร้าง

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRedirect />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<App />} />
        </Route>
        {/* เพิ่ม route อื่นๆ หรือหน้า default */}
        <Route path="/" element={<LoginPage />} /> {/* ถ้าเข้า root ให้ไป login */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);