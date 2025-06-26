import React from 'react';
import AboutImage from '../assets/logo.png';
import VirtualClassImage from '../assets/aprende_desde_casa.png';
import BannerImage from '../assets/banner.png';
import { FaFacebookF, FaTwitter, FaYoutube, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AboutManka = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F6F1] min-h-screen font-sans text-gray-800 flex flex-col">
      {/* Banner superior */}
      <section className="relative">
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${BannerImage})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 p-8 md:p-12 shadow-xl text-center max-w-2xl rounded-lg">
            <h1 className="text-4xl font-serif italic text-[#8C5E3C] mb-2">¿Qué es Manka App?</h1>
            <p className="text-lg text-gray-700">
              Una comunidad digital para artesanos salvadoreños, donde cada pieza cuenta una historia.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de historia y misión */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={AboutImage}
              alt="Sobre Manka App"
              className="rounded shadow-lg w-80 mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#8C5E3C]">Nuestra Historia</h2>
            <p className="text-gray-700 mb-4">
              Manka App nació con la visión de empoderar a los artesanos salvadoreños, brindándoles una plataforma moderna para mostrar y vender sus creaciones. Creemos en el valor de lo hecho a mano, en la cultura y en la conexión humana detrás de cada producto.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-[#8C5E3C]">Nuestra Misión</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Impulsar el comercio justo y local.</li>
              <li>Fomentar el aprendizaje y la colaboración entre artesanos.</li>
              <li>Conectar a creadores con clientes de todo el mundo.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección de valores */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#8C5E3C]">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FDFAF5] p-6 rounded shadow flex flex-col items-center">
              <FaUsers className="text-4xl text-[#8C5E3C] mb-3" />
              <h3 className="font-semibold text-xl mb-2">Comunidad</h3>
              <p className="text-gray-600">
                Creemos en el poder de la colaboración y el apoyo mutuo entre artesanos y clientes.
              </p>
            </div>
            <div className="bg-[#FDFAF5] p-6 rounded shadow flex flex-col items-center">
              <FaLightbulb className="text-4xl text-[#8C5E3C] mb-3" />
              <h3 className="font-semibold text-xl mb-2">Creatividad</h3>
              <p className="text-gray-600">
                Valoramos la innovación y la autenticidad en cada pieza artesanal.
              </p>
            </div>
            <div className="bg-[#FDFAF5] p-6 rounded shadow flex flex-col items-center">
              <FaHandshake className="text-4xl text-[#8C5E3C] mb-3" />
              <h3 className="font-semibold text-xl mb-2">Confianza</h3>
              <p className="text-gray-600">
                Promovemos relaciones transparentes y seguras entre vendedores y compradores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de aprendizaje */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#8C5E3C]">Aprende y Crece</h2>
            <p className="text-gray-700 mb-4">
              En Manka App, no solo vendes, también puedes aprender nuevas técnicas y compartir tus conocimientos con otros. Accede a talleres virtuales, tutoriales y una comunidad activa que te apoya en tu crecimiento.
            </p>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded mt-2"
              onClick={() => navigate('/catalogo')}
            >
              Explora el catálogo
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src={VirtualClassImage}
              alt="Aprende en Manka App"
              className="rounded shadow-lg w-72"
            />
          </div>
        </div>
      </section>

      {/* Footer igual que en landingpage */}
      <footer className="bg-white py-8 mt-auto">
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
    </div>
  );
};

export default AboutManka;