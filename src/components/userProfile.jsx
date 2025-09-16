import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaStore, FaSignOutAlt, FaUserEdit, FaArrowLeft, FaStar, FaImage, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AuthModal from './authModal';
import ReactModal from 'react-modal'; // Si no tienes instalado, usa npm install react-modal

// Utilidad para obtener y actualizar usuario logueado en localStorage
const getLoggedUser = () => JSON.parse(localStorage.getItem('manka_logged_user') || 'null');
const updateLoggedUser = (user) => {
  localStorage.setItem('manka_logged_user', JSON.stringify(user));
  // Actualiza también en la lista de usuarios
  const users = JSON.parse(localStorage.getItem('manka_users') || '[]');
  const idx = users.findIndex(u => u.email === user.email);
  if (idx !== -1) {
    users[idx] = user;
    localStorage.setItem('manka_users', JSON.stringify(users));
  }
};

// Utilidad para productos del vendedor
const getUserProducts = (email) => JSON.parse(localStorage.getItem(`manka_products_${email}`) || '[]');
const saveUserProducts = (email, products) => {
  localStorage.setItem(`manka_products_${email}`, JSON.stringify(products));
};

// Utilidad para productos globales
const getAllProducts = () => JSON.parse(localStorage.getItem('manka_all_products') || '[]');
const saveAllProducts = (products) => {
  localStorage.setItem('manka_all_products', JSON.stringify(products));
};

const getRandomRating = (id) => {
  const ratings = [3, 3.5, 4, 4.5, 5];
  return ratings[id % ratings.length];
};

// CATEGORÍAS: usa las mismas que en ProductSearch
const CATEGORIES = [
  "Cerámica",
  "Pintura Textil",
  "Cuero",
  "Vidrio",
  "Madera",
  "Crochet"
];

const exampleComments = [
  { user: "Ana López", comment: "¡Excelente calidad!", icon: "brown" },
  { user: "Carlos Méndez", comment: "Muy bonito y llegó rápido.", icon: "teal" },
  { user: "María García", comment: "Superó mis expectativas.", icon: "beige" },
];

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getLoggedUser());
  const [menu, setMenu] = useState('general');
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    password: user?.password || '',
    imagen: user?.imagen || '',
  });

  const [success, setSuccess] = useState('');
  // Vendedor
  const [products, setProducts] = useState(getUserProducts(user?.email || ''));
  const [prodForm, setProdForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    cantidad: '',
    categoria: CATEGORIES[0],
  });
  const [prodImgPreview, setProdImgPreview] = useState('');
  const [prodSuccess, setProdSuccess] = useState('');

  // Edición de productos
  const [editProductId, setEditProductId] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    cantidad: '',
    categoria: CATEGORIES[0],
  });
  const [editImgPreview, setEditImgPreview] = useState('');

  // Modal de suspensión
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  // Estado de suspensión
  const [isSuspended, setIsSuspended] = useState(user?.suspendida || false);

  useEffect(() => {
    setUser(getLoggedUser());
    setForm({
      nombre: user?.nombre || '',
      email: user?.email || '',
      password: user?.password || '',
      imagen: user?.imagen || '',
    });
    setProducts(getUserProducts(user?.email || ''));
    setIsSuspended(user?.suspendida || false);

    // Cargar pedidos del usuario
    const allOrders = JSON.parse(localStorage.getItem('manka_orders') || '[]');
    const myOrders = allOrders.filter(o => o.email === user?.email);
    setOrders(myOrders);
    // eslint-disable-next-line
  }, []);

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess('');
  };

  const handleSave = e => {
    e.preventDefault();
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);
    updateLoggedUser(updatedUser);
    setSuccess('¡Datos actualizados!');
  };

  const handleLogout = () => {
    localStorage.removeItem('manka_logged_user');
    navigate('/');
  };

  // Vendedor: manejo de productos
  const handleProdInput = e => {
    const { name, value, files } = e.target;
    if (name === 'imagen' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = ev => {
        setProdForm({ ...prodForm, imagen: ev.target.result });
        setProdImgPreview(ev.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProdForm({ ...prodForm, [name]: value });
    }
    setProdSuccess('');
  };

  const handleAddProduct = e => {
    e.preventDefault();
    if (!user) {
      setProdSuccess('Debes iniciar sesión para publicar productos.');
      return;
    }
    if (!prodForm.nombre || !prodForm.precio || !prodForm.descripcion || !prodForm.imagen || !prodForm.cantidad || !prodForm.categoria) {
      setProdSuccess('Completa todos los campos.');
      return;
    }
    const newProduct = {
      ...prodForm,
      id: Date.now(),
      rating: getRandomRating(Date.now()),
      comments: exampleComments,
      vendedor: user.email,
    };
    // Guarda en productos del usuario
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveUserProducts(user.email, updatedProducts);

    // Guarda en productos globales
    const allProducts = getAllProducts();
    saveAllProducts([...allProducts, newProduct]);

    setProdForm({ nombre: '', precio: '', descripcion: '', imagen: '', cantidad: '', categoria: CATEGORIES[0] });
    setProdImgPreview('');
    setProdSuccess('¡Producto publicado!');
  };

  // Edición de productos
  const handleEditClick = (prod) => {
    setEditProductId(prod.id);
    setEditForm({
      nombre: prod.nombre,
      precio: prod.precio,
      descripcion: prod.descripcion,
      imagen: prod.imagen,
      cantidad: prod.cantidad,
      categoria: prod.categoria,
    });
    setEditImgPreview(prod.imagen);
    setProdSuccess('');
  };

  const handleEditInput = e => {
    const { name, value, files } = e.target;
    if (name === 'imagen' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = ev => {
        setEditForm({ ...editForm, imagen: ev.target.result });
        setEditImgPreview(ev.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleUpdateProduct = e => {
    e.preventDefault();
    if (!editForm.nombre || !editForm.precio || !editForm.descripcion || !editForm.imagen || !editForm.cantidad || !editForm.categoria) {
      setProdSuccess('Completa todos los campos para actualizar.');
      return;
    }
    const updatedProducts = products.map(prod =>
      prod.id === editProductId
        ? { ...prod, ...editForm }
        : prod
    );
    setProducts(updatedProducts);
    saveUserProducts(user.email, updatedProducts);

    // Actualiza también en productos globales
    const allProducts = getAllProducts();
    const updatedAll = allProducts.map(prod =>
      prod.id === editProductId
        ? { ...prod, ...editForm }
        : prod
    );
    saveAllProducts(updatedAll);

    setEditProductId(null);
    setEditForm({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      cantidad: '',
      categoria: CATEGORIES[0],
    });
    setEditImgPreview('');
    setProdSuccess('¡Producto actualizado!');
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditForm({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      cantidad: '',
      categoria: CATEGORIES[0],
    });
    setEditImgPreview('');
    setProdSuccess('');
  };

  // Suspender cuenta
  const handleSuspendAccount = () => {
    const updatedUser = { ...user, suspendida: true };
    setUser(updatedUser);
    updateLoggedUser(updatedUser);
    setIsSuspended(true);
    setShowSuspendModal(false);
    localStorage.removeItem('manka_logged_user');
    navigate('/');
  };

  // Renderiza la lista de pedidos
  const renderOrders = () => (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#8C5E3C]">Mis pedidos</h2>
      {orders.length === 0 ? (
        <div className="text-gray-500 text-center">No has realizado pedidos aún.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, idx) => (
            <div key={order.id || idx} className="border rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={order.product.image || order.product.imagen}
                  alt={order.product.name || order.product.nombre}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div className="font-semibold text-[#8C5E3C]">{order.product.name || order.product.nombre}</div>
                  <div className="text-gray-700 text-sm">Fecha: {order.date || 'Sin fecha'}</div>
                </div>
              </div>
              <button
                className="bg-[#B8D8D3] text-[#8C5E3C] px-3 py-1 rounded hover:bg-[#8C5E3C] hover:text-white text-sm transition"
                onClick={() => navigate(`/rastreo/${order.product.id}`)}
              >
                Ver rastreo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col md:flex-row">
      {/* Menú lateral */}
      <aside className="w-full md:w-64 bg-white shadow-lg flex flex-row md:flex-col py-4 md:py-8 px-2 md:px-4 items-center md:items-stretch">
        <button
          className="mb-6 flex items-center gap-2 text-[#8C5E3C] hover:text-[#7a4b2f] font-semibold"
          onClick={() => navigate('/catalogo')}
        >
          <FaArrowLeft /> Volver
        </button>
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#F9F6F1] flex items-center justify-center overflow-hidden border mb-2">
            {user?.imagen || form.imagen ? (
              <img
                src={form.imagen || user?.imagen}
                alt="Usuario"
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUserCircle className="text-5xl text-[#8C5E3C]" />
            )}
          </div>
          <span className="font-bold text-lg text-[#8C5E3C]">{form.nombre || user?.nombre}</span>
          <span className="text-gray-500 text-sm">{form.email || user?.email}</span>
        </div>
        <nav className="flex flex-col gap-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              menu === 'general'
                ? 'bg-[#F3E6DB] text-[#8C5E3C] font-bold'
                : 'hover:bg-[#F9F6F1] text-gray-700'
            }`}
            onClick={() => setMenu('general')}
          >
            <FaUserEdit /> General
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              menu === 'vendedor'
                ? 'bg-[#F3E6DB] text-[#8C5E3C] font-bold'
                : 'hover:bg-[#F9F6F1] text-gray-700'
            }`}
            onClick={() => setMenu('vendedor')}
          >
            <FaStore /> Vendedor
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              menu === 'orders'
                ? 'bg-[#F3E6DB] text-[#8C5E3C] font-bold'
                : 'hover:bg-[#F9F6F1] text-gray-700'
            }`}
            onClick={() => setMenu('orders')}
          >
            <FaClipboardList /> Mis pedidos
          </button>
        </nav>
        <button
          className="mt-auto flex items-center gap-2 px-4 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition font-semibold"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Cerrar sesión
        </button>
      </aside>
      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-10">
        {menu === 'general' && (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#8C5E3C]">Información General</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSave}>
              {/* Imagen de usuario */}
              <label className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Imagen de usuario</span>
                <div className="w-24 h-24 rounded-full bg-[#F9F6F1] flex items-center justify-center overflow-hidden border">
                  {form.imagen ? (
                    <img src={form.imagen} alt="Usuario" className="object-cover w-full h-full" />
                  ) : (
                    <FaUserCircle className="text-6xl text-[#D4B29B]" />
                  )}
                </div>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => {
                        setForm({ ...form, imagen: ev.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-2"
                />
                <span className="text-xs text-gray-500">Selecciona una imagen</span>
              </label>
              <label className="text-sm font-semibold text-gray-700">
                Nombre completo
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleInput}
                  required
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700">
                Correo electrónico
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  required
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700">
                Contraseña
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  required
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                />
              </label>
              {success && <div className="text-green-600 text-sm">{success}</div>}
              <button
                type="submit"
                className="bg-[#8C5E3C] text-white py-2 rounded-lg hover:bg-[#7a4b2f] transition font-semibold mt-2"
              >
                Guardar cambios
              </button>
            </form>
            <button
              className="mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold w-full"
              onClick={() => setShowSuspendModal(true)}
              disabled={isSuspended}
            >
              {isSuspended ? 'Cuenta suspendida' : 'Suspender cuenta'}
            </button>
            <ReactModal
              isOpen={showSuspendModal}
              onRequestClose={() => setShowSuspendModal(false)}
              className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto mt-32 outline-none"
              overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
              ariaHideApp={false}
            >
              <h3 className="text-xl font-bold mb-4 text-[#8C5E3C]">¿Seguro que quieres suspender tu cuenta?</h3>
              <p className="mb-6 text-gray-700">Tu cuenta quedará inactiva y no podrás iniciar sesión hasta reactivarla.</p>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded font-semibold"
                  onClick={handleSuspendAccount}
                >
                  Suspender
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
                  onClick={() => setShowSuspendModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </ReactModal>
          </div>
        )}
        {menu === 'vendedor' && (
          <div className="w-full bg-white rounded-lg shadow p-8 mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-[#8C5E3C]">Publicar nuevo producto</h2>
            <form className="flex flex-col md:flex-row gap-8 mb-8" onSubmit={handleAddProduct}>
              <div className="flex-1 flex flex-col gap-4">
                <label className="text-sm font-semibold text-gray-700">
                  Nombre del producto
                  <input
                    type="text"
                    name="nombre"
                    value={prodForm.nombre}
                    onChange={handleProdInput}
                    required
                    className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Precio ($)
                  <input
                    type="number"
                    name="precio"
                    value={prodForm.precio}
                    onChange={handleProdInput}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Cantidad
                  <input
                    type="number"
                    name="cantidad"
                    value={prodForm.cantidad}
                    onChange={handleProdInput}
                    required
                    min="1"
                    step="1"
                    className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  />
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Categoría
                  <select
                    name="categoria"
                    value={prodForm.categoria}
                    onChange={handleProdInput}
                    required
                    className="mt-1 w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:border-[#8C5E3C]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-semibold text-gray-700">
                  Descripción
                  <textarea
                    name="descripcion"
                    value={prodForm.descripcion}
                    onChange={handleProdInput}
                    required
                    className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-[#8C5E3C] text-white py-2 rounded-lg hover:bg-[#7a4b2f] transition font-semibold mt-2"
                >
                  Publicar producto
                </button>
                {prodSuccess && <div className="text-green-600 text-sm">{prodSuccess}</div>}
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <label className="w-full flex flex-col items-center cursor-pointer">
                  <span className="text-sm font-semibold text-gray-700 mb-2">Imagen del producto</span>
                  <div className="w-40 h-40 bg-[#F9F6F1] border-2 border-dashed border-[#D4B29B] rounded flex items-center justify-center mb-2 overflow-hidden">
                    {prodImgPreview ? (
                      <img src={prodImgPreview} alt="preview" className="object-cover w-full h-full" />
                    ) : (
                      <FaImage className="text-5xl text-[#D4B29B]" />
                    )}
                  </div>
                  <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleProdInput}
                    className="hidden"
                  />
                  <span className="text-xs text-gray-500">Haz click para seleccionar imagen</span>
                </label>
              </div>
            </form>
            <h2 className="text-2xl font-bold mb-4 text-[#8C5E3C]">Tus productos</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 && (
                <div className="text-gray-500 text-center col-span-3">No has publicado productos aún.</div>
              )}
              {products.map((prod) => (
                <div key={prod.id} className="bg-[#FDFAF5] rounded-lg shadow p-4 flex flex-col">
                  {editProductId === prod.id ? (
                    <form onSubmit={handleUpdateProduct} className="flex flex-col gap-2">
                      <input
                        type="text"
                        name="nombre"
                        value={editForm.nombre}
                        onChange={handleEditInput}
                        required
                        className="border rounded px-2 py-1 mb-1"
                        placeholder="Nombre del producto"
                      />
                      <input
                        type="number"
                        name="precio"
                        value={editForm.precio}
                        onChange={handleEditInput}
                        required
                        min="0"
                        step="0.01"
                        className="border rounded px-2 py-1 mb-1"
                        placeholder="Precio"
                      />
                      <input
                        type="number"
                        name="cantidad"
                        value={editForm.cantidad}
                        onChange={handleEditInput}
                        required
                        min="1"
                        step="1"
                        className="border rounded px-2 py-1 mb-1"
                        placeholder="Cantidad"
                      />
                      <select
                        name="categoria"
                        value={editForm.categoria}
                        onChange={handleEditInput}
                        required
                        className="border rounded px-2 py-1 mb-1"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <textarea
                        name="descripcion"
                        value={editForm.descripcion}
                        onChange={handleEditInput}
                        required
                        className="border rounded px-2 py-1 mb-1"
                        placeholder="Descripción"
                      />
                      <label className="flex flex-col items-center cursor-pointer mb-1">
                        <span className="text-xs text-gray-700">Imagen</span>
                        <div className="w-20 h-20 bg-[#F9F6F1] border-2 border-dashed border-[#D4B29B] rounded flex items-center justify-center mb-1 overflow-hidden">
                          {editImgPreview ? (
                            <img src={editImgPreview} alt="preview" className="object-cover w-full h-full" />
                          ) : (
                            <FaImage className="text-3xl text-[#D4B29B]" />
                          )}
                        </div>
                        <input
                          type="file"
                          name="imagen"
                          accept="image/*"
                          onChange={handleEditInput}
                          className="hidden"
                        />
                        <span className="text-xs text-gray-500">Haz click para seleccionar imagen</span>
                      </label>
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-[#8C5E3C] text-white px-3 py-1 rounded hover:bg-[#7a4b2f] text-sm"
                        >
                          Guardar
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-20 h-20 rounded bg-[#F9F6F1] flex items-center justify-center overflow-hidden border">
                          <img src={prod.imagen} alt={prod.nombre} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-[#8C5E3C]">{prod.nombre}</h3>
                          <div className="text-red-500 font-bold">${parseFloat(prod.precio).toFixed(2)}</div>
                          <div className="text-gray-700 text-sm">Cantidad: {prod.cantidad}</div>
                          <div className="text-gray-700 text-sm">Categoría: {prod.categoria}</div>
                        </div>
                      </div>
                      <div className="mb-2 text-gray-700">{prod.descripcion}</div>
                      <div className="flex items-center mb-2">
                        {[...Array(Math.floor(prod.rating))].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                        {prod.rating % 1 !== 0 && (
                          <FaStar className="text-yellow-300 opacity-50" />
                        )}
                        <span className="ml-2 text-[#8C5E3C] font-semibold">{prod.rating.toFixed(1)} / 5</span>
                      </div>
                      <div className="mt-2">
                        <h4 className="font-semibold text-[#8C5E3C] mb-1">Comentarios:</h4>
                        <div className="space-y-2 max-h-20 overflow-y-auto pr-2">
                          {prod.comments.map((c, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <FaUserCircle
                                className="text-xl"
                                style={{
                                  color:
                                    c.icon === "brown"
                                      ? "#8C5E3C"
                                      : c.icon === "teal"
                                      ? "#B8D8D3"
                                      : "#D4B29B",
                                }}
                              />
                              <div>
                                <div className="font-semibold text-[#8C5E3C]">{c.user}</div>
                                <div className="text-gray-700 text-sm">{c.comment}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        className="mt-3 bg-[#B8D8D3] text-[#8C5E3C] px-3 py-1 rounded hover:bg-[#8C5E3C] hover:text-white text-sm transition"
                        onClick={() => handleEditClick(prod)}
                      >
                        Editar
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {menu === 'orders' && renderOrders()}
      </main>
    </div>
  );
};

export default UserProfile;