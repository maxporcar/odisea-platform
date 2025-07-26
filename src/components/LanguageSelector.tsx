
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ca', label: 'Català', flag: '🏛️' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const current = i18n.language || 'en';

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-warm-orange hover:bg-orange-600 text-white transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {LANGUAGES.find(lang => lang.code === current)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-100 transition-colors ${
              current === lang.code ? 'bg-orange-50 text-warm-orange' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
