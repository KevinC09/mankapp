import React from 'react';
import { FaArrowLeft, FaShoppingCart, FaStar, FaUserCircle } from 'react-icons/fa';
import { useCart } from '../Utils/cartContext';

// Genera una calificación aleatoria entre 3 y 5 estrellas para cada producto
const getRandomRating = (id) => {
  const ratings = [3, 3.5, 4, 4.5, 5];
  return ratings[id % ratings.length];
};

// Comentarios de ejemplo para mostrar en el modal
const exampleComments = [
  {
    user: "Ana López",
    comment: "¡Me encantó la calidad y el diseño! Lo recomiendo totalmente.",
    icon: <FaUserCircle className="text-3xl text-[#8C5E3C]" />,
  },
  {
    user: "Carlos Méndez",
    comment: "Llegó rápido y en perfecto estado. Muy satisfecho con mi compra.",
    icon: <FaUserCircle className="text-3xl text-[#B8D8D3]" />,
  },
  {
    user: "María García",
    comment: "El empaque muy bonito y el producto superó mis expectativas.",
    icon: <FaUserCircle className="text-3xl text-[#D4B29B]" />,
  },
  {
    user: "Pedro Ruiz",
    comment: "Excelente atención y artesanía de primera.",
    icon: <FaUserCircle className="text-3xl text-[#8C5E3C]" />,
  },
];

const ProductDetail = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  // Calificación aleatoria por producto
  const rating = getRandomRating(product.id);

  // Redondeo para estrellas completas y media estrella
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-xl"
        >
          <FaArrowLeft />
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-64 h-64 object-contain rounded"
          />
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-bold text-red-500">{product.price}</span>
              <span className="text-gray-400 line-through">{product.oldPrice}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                -{Math.round(
                  (1 - parseFloat(product.price.replace('$','')) / parseFloat(product.oldPrice.replace('$',''))) * 100
                )}%
              </span>
            </div>
            {/* Calificación en estrellas */}
            <div className="flex items-center mb-2">
              {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
              {hasHalfStar && (
                <FaStar className="text-yellow-300 text-xl opacity-50" />
              )}
              <span className="ml-2 text-[#8C5E3C] font-semibold">{rating.toFixed(1)} / 5</span>
            </div>
            <p className="mb-4 text-gray-700">
              Artesanía única hecha a mano por expertos. ¡Ideal para regalar o decorar tu hogar!
            </p>
            <button
              className="flex items-center bg-[#8C5E3C] text-white px-6 py-2 rounded-lg hover:bg-[#7a4b2f] transition"
              onClick={() => addToCart(product)}
            >
              <FaShoppingCart className="mr-2" /> Agregar al carrito
            </button>
            {/* Comentarios de usuarios */}
            <div className="mt-8 border-t pt-4">
              <h3 className="font-bold text-[#8C5E3C] mb-4">Comentarios de compradores</h3>
              <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                {exampleComments.map((c, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div>{c.icon}</div>
                    <div>
                      <div className="font-semibold text-[#8C5E3C]">{c.user}</div>
                      <div className="text-gray-700 text-sm">{c.comment}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;