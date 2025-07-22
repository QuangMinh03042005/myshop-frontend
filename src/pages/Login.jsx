import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/api/auth/sign-in', {
        username,
        password,
      });
      const token = res.data.response.type + " " + res.data.response.token;
      console.log(res)
      localStorage.setItem('jwt_token', token);
      localStorage.setItem("username", res.data.response.username)
      navigate('/home'); // hoặc trang chính của bạn
    } catch (err) {
      setError('Sai tài khoản hoặc mật khẩu');
    }
  };

  const handleSignup = () => {
    navigate('/signup'); // hoặc thực hiện chuyển hướng sang trang đăng ký
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-sm">Tài khoản</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Nhập tài khoản"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={handleSignup}
              className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
