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
  const [showSearch, setShowSearch] = useState(false);
  const [view, setView] = useState('landing');
  const [showAuth, setShowAuth] = useState(false);

  if (view === 'search') {
    return <ProductSearch onBack={() => setView('landing')} />;
  }


  return (
    <div className="bg-[#F9F6F1] font-sans text-gray-800">
      {/* Banner Principal */}
      <section className="relative">
        <div
          className="w-full h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${BannerImage})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 p-6 md:p-12 shadow-xl text-center max-w-2xl">
            <p className="text-sm uppercase text-gray-600 mb-2 tracking-widest">
              Conectando manos con el mundo
            </p>
            <h1 className="text-3xl font-serif italic ml-2">Manka App</h1>
            <div className="flex justify-center space-x-8 text-gray-700">
              <div className="flex flex-col items-center">
                <FaMugHot className="text-3xl hover:text-red-500" />
                <span className="mt-2 text-sm">Cerámica</span>
              </div>
              <div className="flex flex-col items-center">
                <FaPalette className="text-3xl hover:text-red-500" />
                <span className="mt-2 text-sm">Pintura</span>
              </div>
              <div className="flex flex-col items-center">
                <FaShoppingBag className="text-3xl hover:text-red-500" />
                <span className="mt-2 text-sm">Cuero</span>
              </div>
              <div className="flex flex-col items-center">
                <FaGlassMartini className="text-3xl hover:text-red-500" />
                <span className="mt-2 text-sm">Vidrio</span>
              </div>
              <div className="flex flex-col items-center">
                <FaTree className="text-3xl hover:text-red-500" />
                <span className="mt-2 text-sm">Mimbre</span>
              </div>
            </div>
            <button
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => navigate('/catalogo')}
            >
              Explorar
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Características */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Descubre y Conecta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Sección de Clases Virtuales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Aprende desde Casa</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Acceso 24/7 a tutorías y talleres digitales</li>
              <li>Material descargable y ejemplos prácticos</li>
              <li>Sesiones en vivo con artesanos expertos</li>
              <li>Certificados de participación</li>
            </ul>
            <button className="bg-red-500 text-white px-6 py-3 rounded">
              Ver Talleres
            </button>
          </div>
          <div className="relative">
            <img
              src={VirtualClassImage}
              alt="Clases Virtuales"
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
            <button className="bg-[#D4B29B] text-white px-6 py-3 rounded">
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

