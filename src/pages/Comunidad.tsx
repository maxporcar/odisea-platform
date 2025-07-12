
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Search, Filter, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Post {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
}

const Comunidad = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'María González',
      location: 'Barcelona, España',
      timeAgo: '2 horas',
      content: '¡Acabo de llegar a Barcelona para mi Erasmus! ¿Alguien tiene consejos sobre las mejores zonas para vivir cerca de la UPF? Estoy entre Gràcia y El Born. ¡Gracias por adelantado! 🇪🇸',
      likes: 12,
      comments: 8,
      isLiked: false,
      tags: ['erasmus', 'barcelona', 'alojamiento']
    },
    {
      id: '2',
      author: 'Alex Thompson',
      location: 'Tokio, Japón',
      timeAgo: '5 horas',
      content: 'Después de 6 meses en Tokio, aquí van mis consejos imprescindibles: 1) Descarga Google Translate con cámara 2) Compra una tarjeta Suica el primer día 3) No tengas miedo de señalar en los menús 4) Los konbini son tu mejor amigo. ¿Qué os pareció más difícil de Japón?',
      likes: 34,
      comments: 15,
      isLiked: true,
      tags: ['japón', 'consejos', 'cultura']
    },
    {
      id: '3',
      author: 'Sophie Laurent',
      location: 'Montreal, Canadá',
      timeAgo: '1 día',
      content: 'El invierno canadiense no es broma, pero ¡qué experiencia más increíble! Ayer -25°C y hoy patinando en el canal Rideau. Para los que vengan en invierno: inverted en un buen abrigo, es la mejor inversión que haréis. ❄️',
      image: '/placeholder-winter.jpg',
      likes: 28,
      comments: 12,
      isLiked: false,
      tags: ['canadá', 'invierno', 'experiencia']
    },
    {
      id: '4',
      author: 'Lucas Silva',
      location: 'Buenos Aires, Argentina',
      timeAgo: '2 días',
      content: '¡Hola Odiseanos! Organizo un asado este sábado en Puerto Madero para todos los estudiantes internacionales en Buenos Aires. ¡Traed ganas de conocer gente nueva! Manden MD si se apuntan 🥩',
      likes: 19,
      comments: 23,
      isLiked: true,
      tags: ['buenosaires', 'evento', 'networking']
    },
    {
      id: '5',
      author: 'Emma Wilson',
      location: 'Florencia, Italia',
      timeAgo: '3 días',
      content: 'Después de 4 meses en Florencia, puedo decir que es la ciudad perfecta para estudiar arte. Cada calle es un museo al aire libre. Mi consejo: madrugar para visitar los Uffizi, hay menos colas y mejor luz para las fotos 📸',
      likes: 25,
      comments: 9,
      isLiked: false,
      tags: ['italia', 'arte', 'turismo']
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'Tú',
        location: 'Tu ubicación',
        timeAgo: 'ahora',
        content: newPost,
        likes: 0,
        comments: 0,
        isLiked: false,
        tags: ['nuevo']
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && post.tags.includes(selectedFilter);
  });

  const popularTags = ['erasmus', 'consejos', 'alojamiento', 'cultura', 'eventos', 'networking'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">{t('community.hero.title')}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('community.hero.subtitle')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('community.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="all">{t('community.filters.allPosts')}</option>
              <option value="erasmus">{t('community.filters.erasmus')}</option>
              <option value="consejos">{t('community.filters.tips')}</option>
              <option value="alojamiento">{t('community.filters.housing')}</option>
              <option value="eventos">{t('community.filters.events')}</option>
            </select>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm font-semibold text-gray-600 mr-2">{t('community.popularTags')}:</span>
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === tag
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* New Post Button */}
          <button
            onClick={() => setShowNewPost(true)}
            className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t('community.shareWithCommunity')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
              <h3 className="text-2xl font-bold text-black mb-4">{t('community.newPost.title')}</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={t('community.newPost.placeholder')}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  {t('community.newPost.cancel')}
                </button>
                <button
                  onClick={handleSubmitPost}
                  className="flex-1 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  {t('community.newPost.publish')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-700">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{post.author}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Image */}
                {post.image && (
                  <div className="mb-4">
                    <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500">{t('community.postImage')}</span>
                    </div>
                  </div>
                )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    post.isLiked
                      ? 'text-red-600 bg-red-50 hover:bg-red-100'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
            {t('community.loadMore')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comunidad;
