
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Eye, EyeOff, Star, CheckCircle } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const premiumFeatures = [
    'Checklist interactivo personalizado',
    'Acceso a mentorías con estudiantes veteranos',
    'Housing verificado y seguro',
    'Comunidad premium exclusiva',
    'Soporte prioritario 24/7',
    'Guías detalladas por destino'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Login/Register Form */}
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-black">Odisea</span>
            </Link>
            
            <h2 className="text-3xl font-bold text-black mb-2">
              {isLogin ? 'Bienvenido de vuelta' : 'Únete a Odisea'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Accede a tu cuenta para continuar tu aventura' 
                : 'Crea tu cuenta y comienza tu odisea internacional'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Tu nombre completo"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Confirma tu contraseña"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-black hover:underline font-medium"
              >
                {isLogin 
                  ? '¿No tienes cuenta? Regístrate' 
                  : '¿Ya tienes cuenta? Inicia sesión'
                }
              </button>
            </div>

            {isLogin && (
              <div className="text-center">
                <Link to="/forgot-password" className="text-gray-600 hover:text-black transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}
          </form>
        </div>

        {/* Right Side - Odisea+ Benefits */}
        <div className="bg-black text-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Star className="w-8 h-8 text-yellow-400" />
              <h3 className="text-3xl font-bold">Odisea+</h3>
            </div>
            <p className="text-xl text-gray-300">
              Desbloquea funciones premium para maximizar tu experiencia internacional
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{feature}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">€9.99</div>
              <div className="text-gray-400">por mes</div>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-white text-black py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Comenzar prueba gratuita
            </button>
            <p className="text-xs text-gray-400 text-center">
              Cancela cuando quieras. Sin compromisos.
            </p>
          </div>

          {/* Coming Soon Features */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h4 className="text-lg font-semibold mb-4 text-center">Próximamente</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>🏠 Housing verificado</div>
              <div>👥 Mentorías personalizadas</div>
              <div>📋 Checklist interactivo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
