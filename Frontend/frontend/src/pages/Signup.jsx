import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
      <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
