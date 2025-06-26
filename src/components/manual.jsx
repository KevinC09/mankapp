import React from 'react';
import ManualImage from '../assets/aprende_desde_casa.png';
import AboutImage from '../assets/logo.png';
import { FaFacebookF, FaTwitter, FaYoutube, FaUserPlus, FaBoxOpen, FaShoppingCart, FaUserEdit, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Manual = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F6F1] min-h-screen font-sans text-gray-800 flex flex-col">
      {/* Banner Manual */}
      <section className="relative">
        <div className="w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${ManualImage})` }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 p-8 md:p-12 shadow-xl text-center max-w-2xl rounded-lg">
            <h1 className="text-4xl font-serif italic text-[#8C5E3C] mb-2">Manual de Usuario</h1>
            <p className="text-lg text-gray-700">
              Aprende a usar Manka App paso a paso y aprovecha todas sus funciones.
            </p>
          </div>
        </div>
      </section>

      {/* Instrucciones principales */}
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#8C5E3C]">¿Cómo empezar?</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <FaUserPlus className="text-3xl text-red-500 mt-1" />
                <div>
                  <span className="font-semibold text-lg text-[#8C5E3C]">Crear una cuenta</span>
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-1">
                    <li>Haz clic en <b>Configurar</b> o el ícono de usuario.</li>
                    <li>Completa el formulario de registro con tus datos.</li>
                    <li>Verifica tu correo electrónico si es necesario.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaBoxOpen className="text-3xl text-red-500 mt-1" />
                <div>
                  <span className="font-semibold text-lg text-[#8C5E3C]">Publicar tus productos</span>
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-1">
                    <li>Accede a tu perfil y selecciona la opción <b>Vendedor</b>.</li>
                    <li>Haz clic en <b>Publicar producto</b> y llena los campos requeridos.</li>
                    <li>Agrega imágenes, descripción, precio y cantidad.</li>
                    <li>Guarda y visualiza tu producto en el catálogo.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaShoppingCart className="text-3xl text-red-500 mt-1" />
                <div>
                  <span className="font-semibold text-lg text-[#8C5E3C]">Comprar productos</span>
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-1">
                    <li>Explora el catálogo o usa la barra de búsqueda.</li>
                    <li>Haz clic en <b>Agregar al carrito</b> en el producto deseado.</li>
                    <li>Accede al carrito, revisa tu pedido y finaliza la compra.</li>
                    <li>Recibirás confirmación.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaUserEdit className="text-3xl text-red-500 mt-1" />
                <div>
                  <span className="font-semibold text-lg text-[#8C5E3C]">Gestionar tu perfil</span>
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-1">
                    <li>Edita tu información personal y cambia tu contraseña.</li>
                    <li>Agrega o cambia tu foto de perfil.</li>
                    <li>Consulta tus productos publicados y ventas.</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FaQuestionCircle className="text-3xl text-red-500 mt-1" />
                <div>
                  <span className="font-semibold text-lg text-[#8C5E3C]">Soporte y ayuda</span>
                  <ul className="list-disc list-inside text-gray-700 ml-4 mt-1">
                    <li>Si tienes dudas, consulta la sección de preguntas frecuentes.</li>
                    <li>Contacta al soporte desde el pie de página o por correo.</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={AboutImage}
              alt="Manual visual"
              className="rounded shadow-lg w-64 mb-8"
            />
            <img
              src={ManualImage}
              alt="Manual paso a paso"
              className="rounded shadow-lg w-64"
            />
            <button
              className="mt-8 bg-[#8C5E3C] text-white px-6 py-3 rounded hover:bg-[#7a4b2f] transition"
              onClick={() => navigate('/')}
            >
              Regresar al inicio
            </button>
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

export default Manual;