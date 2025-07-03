-- Populate testimonials table with sample data
INSERT INTO public.testimonials (name, destination, country_id, program, duration, rating, short_story, full_story, tips) VALUES

-- Canada testimonials
('María González', 'Toronto, Canadá', 'canada', 'Intercambio Académico', '1 semestre', 5, 
'Studying in Canada was life-changing – I made friends from every corner of the world and fell in love with the natural beauty.',
'Mi experiencia en Toronto fue increíble. La diversidad cultural de la ciudad me permitió conocer personas de todo el mundo y aprender sobre diferentes culturas. Las universidades canadienses tienen un nivel académico excelente y los profesores son muy accesibles. Además, pude explorar lugares como las Cataratas del Niágara y disfrutar de la vida nocturna de Toronto.',
ARRAY['Lleva ropa de invierno adecuada', 'Aprovecha los descuentos estudiantiles', 'Explora la naturaleza en los fines de semana']),

('Carlos Rodríguez', 'Montreal, Canadá', 'canada', 'Programa de Francés', '6 meses', 5,
'The campus culture is so welcoming. Professors were supportive, and I even got to try skiing for the first time!',
'Montreal es una ciudad única donde el francés y el inglés conviven perfectamente. Estudiar allí me permitió mejorar mi francés mientras vivía en una metrópoli vibrante. Los festivales de verano son espectaculares y la comida es increíble. La vida estudiantil es muy activa y siempre hay algo que hacer.',
ARRAY['Aprende algunas frases en francés antes de llegar', 'Prueba la poutine', 'Asiste a los festivales de verano']),

-- Spain testimonials  
('Sophie Martin', 'Barcelona, España', 'spain', 'Erasmus', '1 año', 5,
'Barcelona combinó perfectamente mis estudios con una vida social increíble. Las playas y la arquitectura de Gaudí son únicas.',
'Mi año Erasmus en Barcelona fue uno de los mejores de mi vida. La ciudad tiene una energía especial, con playas preciosas y una arquitectura impresionante. Los españoles son muy acogedores y siempre están dispuestos a ayudar. Aprendí muchísimo español y pude viajar por toda España los fines de semana.',
ARRAY['Aprende español básico antes de ir', 'Vive en el centro para disfrutar la vida nocturna', 'Viaja por toda España, es fácil y barato']),

('James Wilson', 'Madrid, España', 'spain', 'Estudios Hispánicos', '1 semestre', 4,
'Madrid tiene una energía incomparable. Los museos, la comida y la vida nocturna hacen de esta ciudad un lugar perfecto para estudiar.',
'Madrid me sorprendió por su vitalidad. Como estudiante de arte, pude visitar el Prado y el Reina Sofía constantemente. La vida nocturna madrileña es famosa por algo: ¡no hay nada como las tapas y las terrazas! Los madrileños son muy sociables y me hicieron sentir como en casa desde el primer día.',
ARRAY['Disfruta de las tapas y terrazas', 'Visita todos los museos con tu carné de estudiante', 'Sal por Malasaña y Chueca']),

-- Italy testimonials
('Anna Dubois', 'Roma, Italia', 'italy', 'Historia del Arte', '1 semestre', 5,
'Roma es como un museo al aire libre. Cada día descubría algo nuevo caminando por sus calles históricas.',
'Estudiar historia del arte en Roma fue un sueño hecho realidad. Poder ver en persona las obras que había estudiado en libros fue emocionante. Los italianos son muy expresivos y me enseñaron a disfrutar de la vida. La comida auténtica italiana es incomparable y cada barrio tiene su propia personalidad.',
ARRAY['Camina mucho, Roma se descubre a pie', 'Come en trattorias locales, no en zonas turísticas', 'Aprende italiano básico, los locales lo aprecian']),

('Michael Chen', 'Milano, Italia', 'italy', 'Diseño de Moda', '6 meses', 5,
'Milán es la capital mundial de la moda. Estudiar diseño aquí me abrió puertas que nunca imaginé.',
'Milano me enseñó que la moda es arte. La ciudad respira elegancia y estilo por todas partes. Pude hacer prácticas en empresas de moda importantes y conectar con diseñadores establecidos. El aperitivo milanés es una institución y la vida social gira en torno a él. Los milaneses son muy profesionales pero también saben disfrutar.',
ARRAY['Vístete bien, el estilo importa en Milano', 'Aprovecha el aperitivo para socializar', 'Visita la Quadrilatero della Moda']),

-- France testimonials
('Laura Fernández', 'París, Francia', 'france', 'Literatura Francesa', '1 año', 4,
'París es la ciudad de mis sueños. Cada café, cada museo, cada calle tiene historia y cultura.',
'Mi año en París fue transformador. Estudiar literatura francesa en la ciudad donde nacieron tantos escritores famosos fue inspirador. Los parisinos pueden parecer fríos al principio, pero una vez que te conocen son muy leales. Los museos, los parques y la arquitectura hacen de París una ciudad única para estudiantes.',
ARRAY['Paciencia con los parisinos, son más amables de lo que parecen', 'Aprovecha los museos gratuitos para estudiantes', 'Explora cada arrondissement, todos son diferentes']),

('David Kim', 'Lyon, Francia', 'france', 'Gastronomía', '6 meses', 5,
'Lyon es la capital gastronómica de Francia. Aprendí más sobre cocina francesa en 6 meses que en años de estudio.',
'Lyon superó todas mis expectativas. La ciudad combina tradición culinaria con innovación. Pude estudiar con chefs reconocidos y explorar los famosos bouchons lyonnais. Los lioneses son más relajados que los parisinos y muy orgullosos de su ciudad. La ubicación permite viajar fácilmente por Europa.',
ARRAY['Come en los bouchons tradicionales', 'Aprende sobre vinos franceses', 'Usa Lyon como base para viajar por Europa']);

-- Verification query
SELECT 
  c.name as country,
  COUNT(t.id) as testimonial_count
FROM countries c
LEFT JOIN testimonials t ON c.id = t.country_id
GROUP BY c.name
ORDER BY c.name;