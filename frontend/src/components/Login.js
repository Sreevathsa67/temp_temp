import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      // Expect { token, userType, userId }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userType', res.data.userType);
      localStorage.setItem('userId', res.data.userId);

      if (res.data.userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={onChange}
        /><br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={onChange}
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
