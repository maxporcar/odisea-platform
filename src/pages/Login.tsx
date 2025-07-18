import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Eye, EyeOff, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import SubscribeButton from '../components/SubscribeButton';

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Handle login
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            variant: "destructive",
            title: t('auth.errors.signInError'),
            description: error.message
          });
        } else {
          toast({
            title: t('auth.success.welcome'),
            description: t('auth.success.signedIn')
          });
          navigate('/');
        }
      } else {
        // Handle signup
        if (formData.password !== formData.confirmPassword) {
          toast({
            variant: "destructive",
            title: t('common.error'),
            description: t('auth.errors.passwordMismatch')
          });
          return;
        }

        if (formData.password.length < 6) {
          toast({
            variant: "destructive",
            title: t('common.error'),
            description: t('auth.errors.passwordTooShort')
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.name);
        
        if (error) {
          toast({
            variant: "destructive",
            title: t('auth.errors.signUpError'),
            description: error.message
          });
        } else {
          toast({
            title: t('auth.success.accountCreated'),
            description: t('auth.success.checkEmail')
          });
          setIsLogin(true); // Switch to login mode
          setFormData({ email: '', password: '', name: '', confirmPassword: '' });
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('auth.errors.genericError')
      });
    } finally {
      setLoading(false);
    }
  };

  const premiumFeatures = [
    t('auth.premium.features.checklist'),
    t('auth.premium.features.mentoring'),
    t('auth.premium.features.housing'),
    t('auth.premium.features.community'),
    t('auth.premium.features.support'),
    t('auth.premium.features.guides')
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Login/Register Form */}
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <Link to="/" className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center">
                  <Globe className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-black">Odisea</span>
              </Link>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                {isLogin ? t('auth.login.title') : t('auth.signup.title')}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {isLogin ? t('auth.login.subtitle') : t('auth.signup.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auth.signup.fullName')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    placeholder={t('auth.signup.fullName')}
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                  placeholder={t('auth.login.email')}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    placeholder={t('auth.login.password')}
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
                    {t('auth.signup.confirmPassword')}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    placeholder={t('auth.signup.confirmPassword')}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? (isLogin ? t('auth.login.signingIn') : t('auth.signup.creatingAccount')) : (isLogin ? t('auth.login.signInButton') : t('auth.signup.createAccount'))}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-black hover:underline font-medium text-sm sm:text-base"
                >
                  {isLogin ? t('auth.login.noAccount') : t('auth.signup.hasAccount')}
                </button>
              </div>

              {isLogin && (
                <div className="text-center">
                  <Link to="/forgot-password" className="text-gray-600 hover:text-black transition-colors text-sm">
                    {t('auth.login.forgotPassword')}
                  </Link>
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Odisea+ Benefits */}
          <div className="bg-black text-white rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                <h3 className="text-2xl sm:text-3xl font-bold">{t('auth.premium.title')}</h3>
              </div>
              <p className="text-lg sm:text-xl text-gray-300">
                {t('auth.premium.subtitle')}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-6 sm:pt-8 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">{t('auth.premium.price')}</div>
                <div className="text-gray-400">{t('auth.premium.period')}</div>
              </div>
            </div>

            <div className="space-y-4">
              <SubscribeButton className="w-full bg-white text-black hover:bg-gray-100" />
              <p className="text-xs text-gray-400 text-center">
                {t('auth.premium.cancelAnytime')}
              </p>
            </div>

            {/* Coming Soon Features */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
              <h4 className="text-lg font-semibold mb-4 text-center">{t('auth.premium.comingSoon')}</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>{t('auth.premium.comingSoonFeatures.housing')}</div>
                <div>{t('auth.premium.comingSoonFeatures.mentoring')}</div>
                <div>{t('auth.premium.comingSoonFeatures.checklist')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
