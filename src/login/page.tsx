import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === 'admin' && password === '956213') {
      Cookies.set('token', 'mocked-token', { expires: 1 });
      navigate('/');
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านผิด');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            ระบบค้นหาข้อสอบและเฉลยอัจฉริยะ
          </h1>
          <p className="text-sm text-gray-500">
            ค้นหาข้อสอบที่คล้ายกันได้ง่ายๆ ด้วยระบบอัจฉริยะ
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">เข้าสู่ระบบ</h2>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white w-full py-3 rounded-md hover:bg-blue-800 transition-colors"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
