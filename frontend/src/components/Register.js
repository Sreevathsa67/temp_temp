import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'student'
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('User registered successfully');
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={onChange}
        /><br />
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
        <select name="userType" value={form.userType} onChange={onChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
