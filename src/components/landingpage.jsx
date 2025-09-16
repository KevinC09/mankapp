import React, { useState } from 'react';
import ProductSearch from './productsearch';
import BannerImage from '../assets/banner.png';
import VirtualClassImage from '../assets/aprende_desde_casa.png';
import AboutImage from '../assets/logo.png';
import CrochetLogo from '../assets/crochet.png';
import CeramicaLogo from '../assets/ceramica.png';
import PinturaLogo from '../assets/pintura.png';
import MaderaLogo from '../assets/madera.png';

import {
  FaMugHot,
  FaPalette,
  FaShoppingBag,
  FaGlassMartini,
  FaTree,
  FaBookOpen,
  FaUserCircle,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AuthModal from './authModal';
const LandingPage = () => {
  const navigate = useNavigate();
  
  const [view, setView] = useState('landing');
  const [showAuth, setShowAuth] = useState(false);

  if (view === 'search') {
    return <ProductSearch onBack={() => setView('landing')} />;
  }


  return (
    <div className="bg-[#F9F6F1] font-sans text-gray-800">
      {/* Header Moderno */}
      <header className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          {/* Logo y Título */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
            title="Ir al inicio"
          >
            <img
              src={BannerImage}
              alt="Manka App"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full shadow-md border-2 border-[#8C5E3C] group-hover:scale-105 transition"
            />
            <span className="text-2xl sm:text-3xl font-serif italic text-[#8C5E3C] font-bold tracking-tight group-hover:text-red-500 transition">
              Manka App
            </span>
          </div>
          {/* Navegación e iconos */}
          <nav className="flex flex-wrap items-center gap-2 sm:gap-6 w-full sm:w-auto justify-center">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F6F1] hover:bg-[#F3E6DB] text-[#8C5E3C] font-semibold shadow transition"
              onClick={() => navigate('/catalogo')}
            >
              <FaSearch className="text-lg" />
              Catálogo
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F6F1] hover:bg-[#F3E6DB] text-[#8C5E3C] font-semibold shadow transition"
              onClick={() => {
                const user = localStorage.getItem('manka_logged_user');
                if (user) {
                  navigate('/perfil');
                } else {
                  setShowAuth(true);
                }
              }}
            >
              <FaUserCircle className="text-lg" />
              Mi Perfil
            </button>
            <button
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9F6F1] hover:bg-[#F3E6DB] text-[#8C5E3C] font-semibold shadow transition"
              onClick={() => navigate('/carrito')}
            >
              <FaShoppingBag className="text-lg" />
              Carrito
              {/* Puedes mostrar el número de productos en el carrito aquí si tienes esa variable */}
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span> */}
            </button>
          </nav>
        </div>
      </header>

      {/* Banner Principal */}
      <section className="relative">
        <div
          className="w-full h-60 sm:h-80 bg-gradient-to-r from-[#F9F6F1] via-[#D4B29B]/40 to-[#B8D8D3]/60 flex items-center justify-center overflow-hidden"
          style={{ backgroundImage: `url(${BannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full">
            <div className="bg-white/90 rounded-2xl shadow-2xl px-4 py-6 sm:px-8 sm:py-10 md:py-14 md:px-16 max-w-full sm:max-w-3xl w-full flex flex-col items-center">
              <p className="text-xs md:text-sm uppercase text-[#8C5E3C] mb-2 tracking-widest font-semibold">
                Conectando manos con el mundo
              </p>
              <h1 className="text-4xl md:text-5xl font-serif italic font-bold text-[#8C5E3C] mb-4 tracking-tight drop-shadow">
                Manka App
              </h1>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 my-4">
                <div className="flex flex-col items-center group transition">
                  <FaMugHot className="text-4xl md:text-5xl text-[#D4B29B] group-hover:text-[#B85C38] transition" />
                  <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#8C5E3C]">Cerámica</span>
                </div>
                <div className="flex flex-col items-center group transition">
                  <FaPalette className="text-4xl md:text-5xl text-[#D4B29B] group-hover:text-[#B85C38] transition" />
                  <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#8C5E3C]">Pintura</span>
                </div>
                <div className="flex flex-col items-center group transition">
                  <FaShoppingBag className="text-4xl md:text-5xl text-[#D4B29B] group-hover:text-[#B85C38] transition" />
                  <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#8C5E3C]">Cuero</span>
                </div>
                <div className="flex flex-col items-center group transition">
                  <FaGlassMartini className="text-4xl md:text-5xl text-[#D4B29B] group-hover:text-[#B85C38] transition" />
                  <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#8C5E3C]">Vidrio</span>
                </div>
                <div className="flex flex-col items-center group transition">
                  <FaTree className="text-4xl md:text-5xl text-[#D4B29B] group-hover:text-[#B85C38] transition" />
                  <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#8C5E3C]">Mimbre</span>
                </div>
              </div>
              <button
                className="mt-4 sm:mt-6 bg-gradient-to-r from-[#B85C38] to-[#D4B29B] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:scale-105 hover:from-[#8C5E3C] hover:to-[#B8D8D3] transition"
                onClick={() => navigate('/catalogo')}
              >
                Explorar catálogo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Características */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-2 sm:px-0 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Descubre y Conecta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 shadow-lg flex flex-col items-center">
              <FaBookOpen className="text-4xl text-red-500 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Capacitación</h3>
              <p className="text-gray-600 mb-4">
                Accede a video-tutoriales y talleres virtuales para mejorar tus habilidades.
              </p>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Ver cursos
              </button>
            </div>
            <div className="bg-white p-6 shadow-lg flex flex-col items-center">
              <FaUserCircle className="text-4xl text-red-500 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Mi Perfil</h3>
              <p className="text-gray-600 mb-4">
                Crea tu perfil, comparte tu historia y muestra tu portafolio artesanal.
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  const user = localStorage.getItem('manka_logged_user');
                  if (user) {
                    navigate('/perfil');
                  } else {
                    setShowAuth(true);
                  }
                }}
              >
                Configurar
              </button>
            </div>
            <div className="bg-white p-6 shadow-lg flex flex-col items-center">
              <FaSearch className="text-4xl text-red-500 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Catálogo</h3>
              <p className="text-gray-600 mb-4">
                Explora y compra piezas únicas hechas por artesanos locales.
              </p>
              <button
                onClick={() => navigate('/catalogo')}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Explorar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Manual de Usuario */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Manual de Usuario</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6 text-left">
              <li><span className="font-semibold text-[#8C5E3C]">Crear una cuenta:</span> Aprende a registrarte y configurar tu perfil de artesano o comprador.</li>
              <li><span className="font-semibold text-[#8C5E3C]">Publicar productos:</span> Paso a paso para subir tus artesanías, agregar fotos, descripciones y precios.</li>
              <li><span className="font-semibold text-[#8C5E3C]">Comprar productos:</span> Cómo buscar, agregar al carrito y realizar una compra segura.</li>
              <li><span className="font-semibold text-[#8C5E3C]">Gestionar tu perfil:</span> Edita tu información, cambia tu contraseña y personaliza tu experiencia.</li>
              <li><span className="font-semibold text-[#8C5E3C]">Soporte y ayuda:</span> Dónde encontrar asistencia y resolver dudas frecuentes.</li>
            </ul>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded"
              onClick={() => navigate('/manual')}
            >
              Ver Manual
            </button>
          </div>
          <div className="relative">
            <img
              src={VirtualClassImage}
              alt="Manual de Usuario"
              className="rounded shadow-lg w-48 mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={AboutImage}
              alt="Sobre Manka App"
              className="rounded shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">¿Qué es Manka App?</h2>
            <p className="text-gray-600 mb-6">
              Manka App es la plataforma de comercio electrónico diseñada para artesanos salvadoreños. Nuestro objetivo es brindar un espacio donde puedas mostrar tu trabajo, conectar con clientes y aprender nuevas técnicas sin salir de casa. Aquí, cada pieza cuenta una historia y cada artesano deja su huella cultural.
            </p>
            <button className="bg-[#D4B29B] text-white px-6 py-3 rounded" onClick={() => navigate('/about')}>
              Conócelo más
            </button>
          </div>
        </div>
      </section>

      {/* Sección Próximos Talleres */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Próximos Talleres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Crochet Básico', img: CrochetLogo },
              { title: 'Cerámica Avanzada', img: CeramicaLogo },
              { title: 'Pintura Textil', img: PinturaLogo },
              { title: 'Tejido en Madera', img: MaderaLogo }
            ].map(({ title, img }, idx) => (
              <div key={idx} className="bg-[#FDFAF5] p-4 rounded shadow">
                <img src={img} alt={title} className="rounded mb-4 w-24 h-24 object-contain mx-auto" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-1">Fecha: 15 de Junio</p>
                <p className="text-red-500 font-bold">Gratis</p>
              </div>
            ))}
          </div>
          <button className="mt-8 bg-red-500 text-white px-6 py-3 rounded">
            Ver Todos
          </button>
        </div>
      </section>

      {/* Footer */}
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

export default LandingPage;

