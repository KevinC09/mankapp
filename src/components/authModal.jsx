import React, { useState } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa';

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!open) return null;

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('manka_users') || '[]');
    if (users.find(u => u.email === form.email)) {
      setError('Este correo ya está registrado.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    users.push({
      nombre: form.nombre,
      email: form.email,
      password: form.password,
    });
    localStorage.setItem('manka_users', JSON.stringify(users));
    setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setForm({ nombre: '', email: '', password: '', confirm: '' });
    setTimeout(() => {
      setIsLogin(true);
      setSuccess('');
    }, 1200);
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('manka_users') || '[]');
    const user = users.find(
      u => u.email === form.email && u.password === form.password
    );
    if (!user) {
      setError('Correo o contraseña incorrectos.');
      return;
    }
    localStorage.setItem('manka_logged_user', JSON.stringify(user));
    setSuccess('¡Bienvenido!');
    setTimeout(() => {
      setSuccess('');
      onClose();
    }, 1000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col items-center mb-4">
          <FaUserCircle className="text-5xl text-[#8C5E3C] mb-2" />
          <h2 className="text-2xl font-bold text-[#8C5E3C] mb-2">
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleInput}
              required
              placeholder="Nombre completo"
              className="border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
            />
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            required
            placeholder="Correo electrónico"
            className="border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInput}
            required
            placeholder="Contraseña"
            className="border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
          />
          {!isLogin && (
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleInput}
              required
              placeholder="Confirmar contraseña"
              className="border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
            />
          )}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="bg-[#8C5E3C] text-white py-2 rounded-lg hover:bg-[#7a4b2f] transition font-semibold"
          >
            {isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <span>
              ¿No tienes cuenta?{' '}
              <button
                className="text-[#8C5E3C] font-semibold hover:underline"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setSuccess('');
                  setForm({ nombre: '', email: '', password: '', confirm: '' });
                }}
              >
                Regístrate
              </button>
            </span>
          ) : (
            <span>
              ¿Ya tienes cuenta?{' '}
              <button
                className="text-[#8C5E3C] font-semibold hover:underline"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                  setForm({ nombre: '', email: '', password: '', confirm: '' });
                }}
              >
                Inicia sesión
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;