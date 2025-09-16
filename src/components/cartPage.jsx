import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Utils/cartContext';
import { FaArrowLeft, FaTrash, FaCheckCircle, FaBoxOpen, FaTruck, FaHome, FaRegClock } from 'react-icons/fa';

// Componente de rastreo de pedido
const TrackingSteps = [
  {
    label: "Preparando el pedido",
    icon: <FaBoxOpen className="text-3xl text-[#8C5E3C]" />,
    description: "Tu pedido está siendo preparado por el vendedor.",
  },
  {
    label: "Pedido listo para envío",
    icon: <FaRegClock className="text-3xl text-[#8C5E3C]" />,
    description: "El pedido está listo y será enviado pronto.",
  },
  {
    label: "En camino",
    icon: <FaTruck className="text-3xl text-[#8C5E3C]" />,
    description: "Tu pedido está en camino a la dirección indicada.",
  },
  {
    label: "Entregado",
    icon: <FaHome className="text-3xl text-[#8C5E3C]" />,
    description: "¡El pedido ha sido entregado!",
  },
];

const TrackingOrder = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < TrackingSteps.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 7000);
      return () => clearTimeout(timer);
    } else if (onFinish) {
      // Opcional: llamar a una función cuando termina el rastreo
      onFinish();
    }
  }, [step, onFinish]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto mt-8 text-center">
      <h3 className="text-xl font-bold mb-6 text-[#8C5E3C]">Rastreo de tu pedido</h3>
      <div className="flex flex-col items-center mb-6">
        {TrackingSteps.map((s, idx) => (
          <div key={s.label} className="flex items-center w-full mb-4">
            <div className={`flex items-center justify-center rounded-full border-2 ${idx <= step ? 'border-[#8C5E3C] bg-[#F9F6F1]' : 'border-gray-300 bg-gray-100'} w-12 h-12`}>
              {s.icon}
            </div>
            <div className="ml-4 flex-1 text-left">
              <div className={`font-semibold ${idx === step ? 'text-[#8C5E3C]' : 'text-gray-500'}`}>{s.label}</div>
              {idx === step && <div className="text-sm text-gray-700">{s.description}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded mb-4">
        <div
          className="h-2 bg-[#8C5E3C] rounded transition-all"
          style={{ width: `${((step + 1) / TrackingSteps.length) * 100}%` }}
        />
      </div>
      <div className="text-sm text-gray-500">
        Estado actual: <span className="font-bold text-[#8C5E3C]">{TrackingSteps[step].label}</span>
      </div>
      {step === TrackingSteps.length - 1 && (
        <div className="mt-6 text-green-600 font-bold">¡Gracias por tu compra!</div>
      )}
    </div>
  );
};

const CartPage = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [lastCart, setLastCart] = useState([]);

  // Form state
  const [form, setForm] = useState({
    nombre: '',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    direccion: '',
  });

  // Actualiza la cantidad de un producto en el carrito
  const updateQty = (id, qty) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const handleQtyChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    updateQty(id, qty);
  };

  // Elimina un producto del carrito
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Calcula el total
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.qty;
  }, 0);

  const handleInput = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Descuenta la cantidad en localStorage (catálogo y productos de usuario)
  const descontarCantidad = (cartItems) => {
    // Actualiza productos globales
    const allProducts = JSON.parse(localStorage.getItem('manka_all_products') || '[]');
    let changed = false;
    const updatedAll = allProducts.map(prod => {
      const cartItem = cartItems.find(item => item.id === prod.id);
      if (cartItem && prod.cantidad !== undefined && !isNaN(prod.cantidad)) {
        changed = true;
        return { ...prod, cantidad: Math.max(0, prod.cantidad - cartItem.qty) };
      }
      return prod;
    });
    if (changed) localStorage.setItem('manka_all_products', JSON.stringify(updatedAll));

    // Actualiza productos de cada usuario (si aplica)
    const users = JSON.parse(localStorage.getItem('manka_users') || '[]');
    users.forEach(user => {
      const key = `manka_products_${user.email}`;
      const userProducts = JSON.parse(localStorage.getItem(key) || '[]');
      let userChanged = false;
      const updatedUserProducts = userProducts.map(prod => {
        const cartItem = cartItems.find(item => item.id === prod.id);
        if (cartItem && prod.cantidad !== undefined && !isNaN(prod.cantidad)) {
          userChanged = true;
          return { ...prod, cantidad: Math.max(0, prod.cantidad - cartItem.qty) };
        }
        return prod;
      });
      if (userChanged) localStorage.setItem(key, JSON.stringify(updatedUserProducts));
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Guarda los pedidos en localStorage
    const allOrders = JSON.parse(localStorage.getItem('manka_orders') || '[]');
    const now = new Date().toLocaleString();
    const user = JSON.parse(localStorage.getItem('manka_logged_user') || 'null');
    const newOrders = cart.map(product => ({
      id: Date.now() + Math.random(), // id único
      email: user?.email,
      product,
      date: now,
    }));
    localStorage.setItem('manka_orders', JSON.stringify([...allOrders, ...newOrders]));
    setLastCart(cart); // Guarda el carrito antes de vaciarlo
    setShowModal(true);
    descontarCantidad(cart);
    // Guarda los productos comprados en localStorage para rastreo
    localStorage.setItem('manka_last_order', JSON.stringify(cart));
    setCart([]);
  };

  // Redirige automáticamente al rastreo después de la confirmación
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        if (lastCart.length > 0) {
          navigate(`/rastreo/${lastCart[0].id}`);
        } else {
          navigate('/catalogo');
        }
      }, 3500); // 3.5 segundos de espera en el mensaje de confirmación
      return () => clearTimeout(timer);
    }
  }, [showModal, lastCart, navigate]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-[#D4B29B] shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-gray-900 text-xl mr-4"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold"> </h2>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow">
            Tu carrito está vacío.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulario de pago */}
            <form
              className="bg-white rounded-lg shadow p-6 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <h3 className="text-xl font-bold mb-2 text-[#8C5E3C]">Datos de pago</h3>
              <label className="text-sm font-semibold text-gray-700">
                Nombre del titular
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleInput}
                  required
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  placeholder="Como aparece en la tarjeta"
                />
              </label>
              <label className="text-sm font-semibold text-gray-700">
                Número de tarjeta
                <input
                  type="text"
                  name="tarjeta"
                  value={form.tarjeta}
                  onChange={handleInput}
                  required
                  maxLength={16}
                  pattern="\d{16}"
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  placeholder="1234 5678 9012 3456"
                />
              </label>
              <div className="flex gap-4">
                <label className="flex-1 text-sm font-semibold text-gray-700">
                  Vencimiento
                  <input
                    type="text"
                    name="vencimiento"
                    value={form.vencimiento}
                    onChange={handleInput}
                    required
                    maxLength={5}
                    pattern="\d{2}/\d{2}"
                    className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                    placeholder="MM/AA"
                  />
                </label>
                <label className="flex-1 text-sm font-semibold text-gray-700">
                  CVV
                  <input
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleInput}
                    required
                    maxLength={4}
                    pattern="\d{3,4}"
                    className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                    placeholder="123"
                  />
                </label>
              </div>
              <label className="text-sm font-semibold text-gray-700">
                Dirección de envío
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleInput}
                  required
                  className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  placeholder="Dirección completa"
                />
              </label>
              <button
                type="submit"
                className="mt-4 w-full bg-[#8C5E3C] text-white py-3 rounded-lg hover:bg-[#7a4b2f] transition text-lg font-semibold"
              >
                Finalizar compra
              </button>
            </form>
            {/* Listado de productos con opción de agregar más cantidad */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-[#8C5E3C]">Resumen de compra</h3>
              <ul className="divide-y">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center py-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4 border" />
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-red-500 font-bold">{item.price}</div>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-700 mr-2">Cantidad:</span>
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={e => handleQtyChange(item.id, e.target.value)}
                          className="w-16 border rounded px-2 py-1 text-center"
                        />
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-6 border-t pt-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-red-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-[#8C5E3C]">¡Compra realizada!</h2>
            <p className="mb-6 text-gray-700">
              Tu pedido ha sido procesado exitosamente.<br />
              Pronto recibirás un correo con los detalles.
            </p>
            <span className="text-[#8C5E3C] font-semibold">Redirigiendo al rastreo...</span>
          </div>
        </div>
      )}
      {/* El rastreo ahora está en StatusPage */}
    </div>
  );
};

export default CartPage;