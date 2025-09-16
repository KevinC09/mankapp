import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaRegClock, FaTruck, FaHome, FaArrowLeft, FaStar, FaTimes } from 'react-icons/fa';

const TrackingSteps = [
  {
    label: "Preparando el pedido",
    icon: <FaBoxOpen className="text-4xl md:text-5xl text-[#8C5E3C]" />,
    description: "Tu pedido está siendo preparado por el vendedor.",
  },
  {
    label: "Pedido listo para envío",
    icon: <FaRegClock className="text-4xl md:text-5xl text-[#8C5E3C]" />,
    description: "El pedido está listo y será enviado pronto.",
  },
  {
    label: "En camino",
    icon: <FaTruck className="text-4xl md:text-5xl text-[#8C5E3C]" />,
    description: "Tu pedido está en camino a la dirección indicada.",
  },
  {
    label: "Entregado",
    icon: <FaHome className="text-4xl md:text-5xl text-[#8C5E3C]" />,
    description: "¡El pedido ha sido entregado!",
  },
];

const StatusPage = () => {
  const { idproducto } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState(null);

  // Modal de calificación
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [ratingSuccess, setRatingSuccess] = useState(false);

  useEffect(() => {
    // Busca el producto en el último pedido
    const lastOrder = JSON.parse(localStorage.getItem('manka_last_order') || '[]');
    const found = lastOrder.find(p => String(p.id) === String(idproducto));
    setProduct(found);
  }, [idproducto]);

  useEffect(() => {
    if (step < TrackingSteps.length - 1) {
      const timer = setTimeout(() => setStep(step + 1), 7000);
      return () => clearTimeout(timer);
    } else {
      // Cuando llega al último paso, muestra el modal de calificación
      setShowRatingModal(true);
    }
  }, [step]);

  // Guardar calificación en localStorage
  const handleSubmitRating = e => {
    e.preventDefault();
    if (!product) return;
    // Guardar en productos (puedes adaptar según tu estructura)
    const prodKey = `manka_products_${product.vendedor || product.email || ''}`;
    const products = JSON.parse(localStorage.getItem(prodKey) || '[]');
    const idx = products.findIndex(p => String(p.id) === String(product.id));
    if (idx !== -1) {
      if (!products[idx].comments) products[idx].comments = [];
      products[idx].comments.push({
        user: JSON.parse(localStorage.getItem('manka_logged_user') || '{}').nombre || 'Anónimo',
        rating: stars,
        comment,
        icon: "brown",
      });
      // Actualizar rating promedio
      const ratings = products[idx].comments.map(c => c.rating);
      products[idx].rating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      localStorage.setItem(prodKey, JSON.stringify(products));
    }
    setRatingSuccess(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSuccess(false);
    }, 1500);
  };

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen font-sans flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full mx-auto text-center">
          <button
            className="absolute top-8 left-8 text-[#8C5E3C] text-2xl flex items-center gap-2"
            onClick={() => navigate('/perfil')}
          >
            <FaArrowLeft /> Volver al perfil
          </button>
          <h3 className="text-2xl font-bold mb-6 text-[#8C5E3C]">Producto no encontrado</h3>
          <p className="text-gray-700 text-lg">No se encontró información de rastreo para este producto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl w-full mx-auto relative">
        <button
          className="absolute top-8 left-8 text-[#8C5E3C] text-2xl flex items-center gap-2"
          onClick={() => navigate('/perfil')}
        >
          <FaArrowLeft /> Volver al perfil
        </button>
        <div className="mb-10 flex flex-col items-center">
          <img
            src={product.image || product.imagen}
            alt={product.name || product.nombre}
            className="w-32 h-32 object-cover rounded-xl mx-auto mb-4 shadow"
          />
          <div className="font-semibold text-2xl text-[#8C5E3C]">{product.name || product.nombre}</div>
        </div>
        {/* Espacio extra entre producto y título */}
        <div className="mb-16"></div>
        <h3 className="text-3xl font-bold mb-10 text-[#8C5E3C]">Rastreo de tu pedido</h3>
        <div className="flex flex-col items-center mb-10">
          {TrackingSteps.map((s, idx) => (
            <div key={s.label} className="flex items-center w-full mb-6">
              <div className={`flex items-center justify-center rounded-full border-4 ${idx <= step ? 'border-[#8C5E3C] bg-[#F9F6F1]' : 'border-gray-300 bg-gray-100'} w-16 h-16`}>
                {s.icon}
              </div>
              <div className="ml-6 flex-1 text-left">
                <div className={`font-bold text-lg ${idx === step ? 'text-[#8C5E3C]' : 'text-gray-500'}`}>{s.label}</div>
                {idx === step && <div className="text-base text-gray-700">{s.description}</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-3 bg-gray-200 rounded mb-6">
          <div
            className="h-3 bg-[#8C5E3C] rounded transition-all"
            style={{ width: `${((step + 1) / TrackingSteps.length) * 100}%` }}
          />
        </div>
        <div className="text-lg text-gray-500 mb-4">
          Estado actual: <span className="font-bold text-[#8C5E3C]">{TrackingSteps[step].label}</span>
        </div>
        {step === TrackingSteps.length - 1 && (
          <div className="mt-8 text-green-600 font-bold text-xl">¡Gracias por tu compra!</div>
        )}

        {/* Modal de calificación */}
        {showRatingModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setShowRatingModal(false)}
                title="Cerrar"
              >
                <FaTimes />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-[#8C5E3C]">Califica tu producto</h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmitRating}>
                <div className="flex justify-center gap-2 mb-2">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setStars(n)}
                      className="focus:outline-none"
                    >
                      <FaStar className={`text-3xl ${n <= stars ? 'text-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:border-[#8C5E3C] bg-gray-50"
                  placeholder="Escribe un comentario (opcional)"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-[#8C5E3C] text-white py-2 rounded-lg hover:bg-[#7a4b2f] transition font-semibold"
                  disabled={stars === 0}
                >
                  Enviar calificación
                </button>
                {ratingSuccess && (
                  <div className="text-green-600 text-sm mt-2">¡Gracias por tu calificación!</div>
                )}
              </form>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Puedes cerrar este mensaje en cualquier momento.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPage;