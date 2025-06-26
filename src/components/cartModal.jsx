import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../Utils/cartContext';

const CartModal = ({ open, onClose }) => {
  const { cart, addToCart } = useCart();

  if (!open) return null;

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Tu carrito está vacío.</div>
        ) : (
          <div>
            <ul className="divide-y">
              {cart.map(item => (
                <li key={item.id} className="flex items-center py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-red-500 font-bold">{item.price} <span className="text-gray-500 font-normal">x{item.qty}</span></div>
                  </div>
                  {/* Aquí podrías agregar botones para sumar/restar o eliminar */}
                  {/* <button className="ml-2 text-gray-400 hover:text-red-600"><FaTrash /></button> */}
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-6">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-lg text-red-600">${total.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-[#8C5E3C] text-white py-3 rounded-lg hover:bg-[#7a4b2f] transition text-lg">
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;