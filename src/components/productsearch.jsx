import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaAngleRight, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import mankaLogo from '../assets/logo.png';
import tazaceramica from '../assets/tazaceramica.png';
import bufanda from '../assets/bufanda.png';
import bolso from '../assets/cartera.png';
import jarron from '../assets/jarron.png';
import cuenco from '../assets/cuenco.png';
import collar from '../assets/collar.png';
import portavasos from '../assets/portavasos.png';
import amiguru from '../assets/amiguru.png';
import ProductDetail from './productDetail';
import { useCart } from '../Utils/cartContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from './authModal';

const ProductSearch = ({ onBack }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { cartCount, addToCart } = useCart();
  const [showAuth, setShowAuth] = useState(false);

  // Categorías (asegúrate que coincidan con las del perfil)
  const categories = [
    { id: 1, name: 'Cerámica', icon: '🏺', key: 'ceramica' },
    { id: 2, name: 'Pintura Textil', icon: '🎨', key: 'pintura' },
    { id: 3, name: 'Cuero', icon: '👜', key: 'cuero' },
    { id: 4, name: 'Vidrio', icon: '🍷', key: 'vidrio' },
    { id: 5, name: 'Madera', icon: '🌳', key: 'madera' },
    { id: 6, name: 'Crochet', icon: '🧶', key: 'crochet' }
  ];

  // Catálogo base
  const catalog = [
    { id: 1, name: 'Taza de cerámica artesanal', price: '$12.00', oldPrice: '$15.00', image: tazaceramica, category: 'ceramica' },
    { id: 2, name: 'Bufanda de crochet hecha a mano', price: '$20.00', oldPrice: '$25.00', image: bufanda, category: 'crochet' },
    { id: 3, name: 'Bolso de cuero natural', price: '$45.00', oldPrice: '$60.00', image: bolso, category: 'cuero' },
    { id: 4, name: 'Jarrón de vidrio soplado', price: '$30.00', oldPrice: '$35.00', image: jarron, category: 'vidrio' },
    { id: 5, name: 'Cuenco de madera tallada', price: '$18.00', oldPrice: '$22.00', image: cuenco, category: 'madera' },
    { id: 6, name: 'Collar de cuentas artesanales', price: '$25.00', oldPrice: '$30.00', image: collar, category: 'pintura' },
    { id: 7, name: 'Juego de posavasos pintados a mano', price: '$22.00', oldPrice: '$28.00', image: portavasos, category: 'pintura' },
    { id: 8, name: 'Amigurumi de crochet personalizado', price: '$28.00', oldPrice: '$35.00', image: amiguru, category: 'crochet' }
  ];

  // Productos de usuario desde localStorage
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('manka_all_products') || '[]');
    // Normaliza los productos para que tengan las mismas propiedades que el catálogo
    const normalized = all.map(prod => ({
      id: prod.id,
      name: prod.nombre,
      price: `$${parseFloat(prod.precio).toFixed(2)}`,
      oldPrice: '', // Puedes agregar lógica para oldPrice si lo deseas
      image: prod.imagen,
      category: prod.categoria ? prod.categoria.toLowerCase() : 'otros',
      cantidad: prod.cantidad,
      descripcion: prod.descripcion,
      rating: prod.rating,
      comments: prod.comments,
      vendedor: prod.vendedor,
    }));
    setUserProducts(normalized);
  }, []);

  // Unir catálogo base y productos de usuarios
  const allProducts = [...catalog, ...userProducts];

  // Filtrado por categoría y búsqueda
  const filteredCatalog = (results.length ? results : allProducts)
    .filter(item =>
      (!selectedCategory || (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()))
    );

  const handleSearch = () => {
    const filtered = allProducts.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSelectedCategory('');
  };

  const handleCategory = (catKey) => {
    setSelectedCategory(catKey);
    setResults([]);
    setQuery('');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-[#D4B29B] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo de Manka App */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
              style={{ userSelect: 'none' }}
              title="Ir al inicio"
            >
              <img src={mankaLogo} alt="Manka App" className="h-8 w-auto" />
              <span className="text-3xl font-serif italic ml-2">Manka App</span>
            </div>
            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar artesanía..."
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:border-gray-400 bg-gray-50"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
            {/* Iconos de usuario y carrito */}
            <div className="flex items-center space-x-6">
              <FaUser
                className="text-gray-600 text-xl cursor-pointer hover:text-gray-800"
                onClick={() => {
                  const user = localStorage.getItem('manka_logged_user');
                  if (user) {
                    navigate('/perfil');
                  } else {
                    setShowAuth(true);
                  }
                }}
              />
              <div className="relative">
                <FaShoppingCart
                  className="text-gray-600 text-xl cursor-pointer hover:text-gray-800"
                  onClick={() => navigate('/carrito')}
                />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="font-medium"></span>
              <button
                onClick={() => navigate('/')}
                className="ml-2 bg-[#8C5E3C] text-white px-4 py-2 rounded-lg hover:bg-[#7a4b2f] transition"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Layout Principal con sidebar */}
      <div className="flex max-w-7xl mx-auto px-4 py-8">
        {/* Sidebar de categorías */}
        <aside className="w-64 flex-shrink-0 mr-8">
          <nav className="bg-white rounded-lg shadow-sm">
            {categories.map(cat => (
              <div
                key={cat.id}
                onClick={() => handleCategory(cat.key)}
                className={`flex items-center justify-between px-4 py-3 hover:bg-[#F9F6F1] cursor-pointer border-b last:border-b-0 transition-colors ${
                  selectedCategory === cat.key ? 'bg-[#F3E6DB] font-bold text-[#8C5E3C]' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{cat.icon}</span>
                  <span className="text-gray-700">{cat.name}</span>
                </div>
                <FaAngleRight className="text-gray-400" />
              </div>
            ))}
            <div
              onClick={() => handleCategory('')}
              className={`flex items-center justify-between px-4 py-3 hover:bg-[#F9F6F1] cursor-pointer transition-colors ${
                selectedCategory === '' ? 'bg-[#F3E6DB] font-bold text-[#8C5E3C]' : ''
              }`}
            >
              <span className="text-gray-700">Ver todos</span>
            </div>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1">
          {/* Banner promocional */}
          <div className="bg-[#B8D8D3] rounded-lg p-8 mb-8 relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-2">¡Descubre Artesanía Exclusiva!</h2>
            <p className="text-xl mb-4">Los mejores productos hechos a mano, directamente para ti.</p>
          </div>
          {/* Grid de resultados o catálogo completo */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Productos Destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredCatalog.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex flex-col h-full"
                >
                  <div onClick={() => setSelectedProduct(item)} className="flex-1 flex flex-col cursor-pointer">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {item.oldPrice && item.oldPrice !== '' && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          -{Math.round(
                            (1 - parseFloat(item.price.replace('$', '')) / parseFloat(item.oldPrice.replace('$', ''))) * 100
                          )}%
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-medium text-sm mb-2">{item.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-bold text-red-500">{item.price}</span>
                        {item.oldPrice && item.oldPrice !== '' && (
                          <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                        )}
                      </div>
                      {item.cantidad && (
                        <div className="text-xs text-gray-500">Cantidad: {item.cantidad}</div>
                      )}
                      {item.descripcion && (
                        <div className="text-xs text-gray-500 truncate">{item.descripcion}</div>
                      )}
                      {item.vendedor && (
                        <div className="text-xs text-gray-400">Vendedor: {item.vendedor}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-[#8C5E3C] text-white py-2 rounded-b-lg hover:bg-[#7a4b2f] transition mt-auto text-lg"
                  >
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>
          </section>
          {/* Detalle del producto */}
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </main>
      </div>
      <footer className="bg-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">Contacto: info@mankaapp.com | +503 1234-5678</p>
          <p className="mb-2">Síguenos en redes sociales</p>
          <div className="flex justify-center space-x-4 text-xl text-gray-600">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </footer>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default ProductSearch;