-- Populate countries table
INSERT INTO public.countries (id, name, capital, continent, language, currency, population, cost_of_living, description, capital_description, student_population, flag, housing, transportation, visa_info, latitude, longitude) VALUES

-- Canada
('canada', 'Canadá', 'Ottawa', 'América del Norte', 'Inglés y Francés', 'CAD', '38 millones', 'high', 
'Canada is a vast country known for its stunning natural landscapes and vibrant multicultural cities. From the rocky peaks and turquoise lakes of the west to the historic charm of eastern provinces, international students will find a welcoming environment. English and French are the official languages (with French mainly in Québec), but you'll hear many languages on campus due to Canada's diversity. Canadians are famous for being friendly, polite, and inclusive, so you can expect people to be helpful and kind to newcomers. Canada consistently ranks as one of the top countries for quality of life.',
'Ottawa es la capital federal, una ciudad bilingüe conocida por sus museos de clase mundial y el famoso Canal Rideau.',
'1.8 millones de estudiantes internacionales', '🇨🇦', 
'Alojamiento universitario disponible, apartamentos compartidos populares entre estudiantes. Costos varían por ciudad.',
'Transporte público robusto en ciudades grandes. U-Pass estudiantil ofrece descuentos significativos.',
'Study Permit requerido para estudios >6 meses. CAQ adicional para Québec. Permite trabajo 20h/semana.',
45.4215, -75.6972),

-- Spain  
('spain', 'España', 'Madrid', 'Europa', 'Español', 'EUR', '47 millones', 'medium',
'España combina una rica historia milenaria con una vibrante cultura moderna. Los estudiantes internacionales disfrutan de un clima mediterráneo, gastronomía excepcional y una vida social muy activa. El país ofrece universidades de prestigio, costos de vida razonables y la oportunidad de aprender o perfeccionar el español. Las ciudades españolas son conocidas por su arquitectura impresionante, desde la Sagrada Familia en Barcelona hasta el Palacio Real en Madrid. La cultura española valora las relaciones sociales, la comida compartida y un equilibrio saludable entre trabajo y vida personal.',
'Madrid es el corazón político y cultural de España, famosa por sus museos como el Prado y su vibrante vida nocturna.',
'200,000 estudiantes internacionales', '🇪🇸',
'Residencias universitarias, pisos compartidos muy comunes. Precios accesibles comparado con otros países europeos.',
'Excelente transporte público. Abono Joven ofrece descuentos para estudiantes menores de 26 años.',
'Ciudadanos UE: solo DNI. No-UE: visa de estudiante para estancias >90 días. Permite trabajo 20h/semana.',
40.4168, -3.7038),

-- Italy
('italy', 'Italia', 'Roma', 'Europa', 'Italiano', 'EUR', '60 millones', 'medium',
'Italia es la cuna del Renacimiento y hogar de algunas de las universidades más antiguas del mundo. Los estudiantes internacionales se enamoran de su rica herencia cultural, arte incomparable y gastronomía auténtica. Desde las canales de Venecia hasta los viñedos de la Toscana, Italia ofrece experiencias únicas. Las universidades italianas son reconocidas mundialmente, especialmente en arte, diseño, arquitectura y humanidades. Los italianos valoran la familia, la tradición y disfrutan de la vita bella con pasión.',
'Roma, la Ciudad Eterna, combina ruinas antiguas con vida moderna. Hogar del Vaticano y centro de la cultura italiana.',
'100,000 estudiantes internacionales', '🇮🇹',
'Alojamiento universitario limitado. Apartamentos compartidos (condivisione) muy populares entre estudiantes.',
'Transporte público eficiente en ciudades grandes. Tarjetas estudiantiles ofrecen descuentos significativos.',
'Ciudadanos UE: solo documento identidad. No-UE: visa de estudiante requerida. Permite trabajo part-time.',
41.9028, 12.4964),

-- France
('france', 'Francia', 'París', 'Europa', 'Francés', 'EUR', '67 millones', 'high',
'Francia es sinónimo de elegancia, cultura y excelencia académica. Los estudiantes internacionales descubren un país que ha dado forma a la filosofía, arte y ciencia modernos. Desde los cafés parisinos hasta los campos de lavanda en Provenza, Francia ofrece diversidad cultural y geográfica. El sistema educativo francés es reconocido mundialmente, con grandes écoles y universidades prestigiosas. Los franceses valoran el debate intelectual, la gastronomía refinada y el savoir-vivre.',
'París, la Ciudad de la Luz, es un centro mundial de arte, moda y cultura. Hogar de la Torre Eiffel y el Louvre.',
'370,000 estudiantes internacionales', '🇫🇷',
'CROUS ofrece alojamiento universitario asequible. Apartamentos privados más costosos, especialmente en París.',
'Excelente red de transporte público. Descuentos estudiantiles significativos con tarjeta Imagine R.',
'Ciudadanos UE: libre circulación. No-UE: visa de estudiante long-stay. Campus France facilita procesos.',
48.8566, 2.3522);

-- Populate cities table
INSERT INTO public.cities (id, name, country_id, description, latitude, longitude) VALUES

-- Canadian cities
(gen_random_uuid(), 'Toronto', 'canada', 'La ciudad más grande de Canadá, centro financiero y multicultural con universidades de clase mundial.', 43.6532, -79.3832),
(gen_random_uuid(), 'Montreal', 'canada', 'Metrópoli bilingüe con encanto europeo, famosa por sus festivales y vida estudiantil vibrante.', 45.5017, -73.5673),
(gen_random_uuid(), 'Vancouver', 'canada', 'Ciudad costera rodeada de montañas, conocida por su belleza natural y diversidad cultural.', 49.2827, -123.1207),

-- Spanish cities  
(gen_random_uuid(), 'Barcelona', 'spain', 'Capital catalana famosa por la arquitectura de Gaudí, playas mediterráneas y ambiente cosmopolita.', 41.3851, 2.1734),
(gen_random_uuid(), 'Madrid', 'spain', 'Capital de España, centro político y cultural con museos de clase mundial y intensa vida nocturna.', 40.4168, -3.7038),
(gen_random_uuid(), 'Valencia', 'spain', 'Ciudad mediterránea que combina tradición y modernidad, famosa por la paella y la Ciudad de las Artes.', 39.4699, -0.3763),

-- Italian cities
(gen_random_uuid(), 'Roma', 'italy', 'La Ciudad Eterna, donde la historia antigua convive con la vida moderna en cada esquina.', 41.9028, 12.4964),
(gen_random_uuid(), 'Milano', 'italy', 'Capital de la moda y los negocios, puerta de entrada a los Alpes y centro de innovación.', 45.4642, 9.1900),
(gen_random_uuid(), 'Bologna', 'italy', 'Ciudad universitaria histórica, conocida por su gastronomía y arquitectura medieval única.', 44.4949, 11.3426),

-- French cities
(gen_random_uuid(), 'Paris', 'france', 'La Ciudad de la Luz, centro mundial de arte, cultura y gastronomía con universidades prestigiosas.', 48.8566, 2.3522),
(gen_random_uuid(), 'Montpellier', 'france', 'Ciudad universitaria del sur, combinando historia medieval con investigación de vanguardia.', 43.6108, 3.8767),
(gen_random_uuid(), 'Lyon', 'france', 'Capital gastronómica francesa, centro de investigación biomédica e innovación tecnológica.', 45.7640, 4.8357);

-- Populate universities table (using city names to match)
INSERT INTO public.universities (name, country_id, city_id, description, website_url, ranking) VALUES

-- Canadian universities
('University of Toronto', 'canada', (SELECT id FROM cities WHERE name = 'Toronto' AND country_id = 'canada'), 'Una de las principales universidades de investigación del mundo, conocida por su excelencia académica y diversidad.', 'https://www.utoronto.ca', 25),
('Ryerson University', 'canada', (SELECT id FROM cities WHERE name = 'Toronto' AND country_id = 'canada'), 'Universidad innovadora enfocada en programas profesionales y tecnología aplicada.', 'https://www.torontomu.ca', 150),
('McGill University', 'canada', (SELECT id FROM cities WHERE name = 'Montreal' AND country_id = 'canada'), 'Universidad de investigación de prestigio mundial con hermoso campus en el centro de Montreal.', 'https://www.mcgill.ca', 30),
('Université de Montréal', 'canada', (SELECT id FROM cities WHERE name = 'Montreal' AND country_id = 'canada'), 'Principal universidad francófona de investigación, líder en ciencias de la salud y tecnología.', 'https://www.umontreal.ca', 85),
('University of British Columbia', 'canada', (SELECT id FROM cities WHERE name = 'Vancouver' AND country_id = 'canada'), 'Universidad de investigación global con campus espectacular frente al océano Pacífico.', 'https://www.ubc.ca', 35),
('Simon Fraser University', 'canada', (SELECT id FROM cities WHERE name = 'Vancouver' AND country_id = 'canada'), 'Universidad innovadora conocida por sus programas cooperativos y arquitectura moderna.', 'https://www.sfu.ca', 120),

-- Spanish universities
('Universidad de Barcelona', 'spain', (SELECT id FROM cities WHERE name = 'Barcelona' AND country_id = 'spain'), 'Principal universidad de Cataluña, reconocida por su investigación y programas internacionales.', 'https://www.ub.edu', 180),
('Universitat Politècnica de Catalunya', 'spain', (SELECT id FROM cities WHERE name = 'Barcelona' AND country_id = 'spain'), 'Universidad técnica líder en ingeniería, arquitectura y tecnologías de la información.', 'https://www.upc.edu', 200),
('Universidad Complutense de Madrid', 'spain', (SELECT id FROM cities WHERE name = 'Madrid' AND country_id = 'spain'), 'Una de las universidades más antiguas del mundo, con amplia oferta académica y cultural.', 'https://www.ucm.es', 220),
('Universidad Politécnica de Madrid', 'spain', (SELECT id FROM cities WHERE name = 'Madrid' AND country_id = 'spain'), 'Universidad técnica de prestigio, líder en ingeniería y arquitectura en España.', 'https://www.upm.es', 250),
('Universitat de València', 'spain', (SELECT id FROM cities WHERE name = 'Valencia' AND country_id = 'spain'), 'Universidad histórica con fuerte tradición en ciencias y humanidades.', 'https://www.uv.es', 280),
('Universitat Politècnica de València', 'spain', (SELECT id FROM cities WHERE name = 'Valencia' AND country_id = 'spain'), 'Universidad técnica moderna, reconocida por innovación y vínculos con la industria.', 'https://www.upv.es', 300),

-- Italian universities  
('Sapienza Università di Roma', 'italy', (SELECT id FROM cities WHERE name = 'Roma' AND country_id = 'italy'), 'Una de las universidades más grandes de Europa, líder en investigación clásica y moderna.', 'https://www.uniroma1.it', 150),
('Università Roma Tor Vergata', 'italy', (SELECT id FROM cities WHERE name = 'Roma' AND country_id = 'italy'), 'Universidad moderna conocida por excelencia en ciencias, medicina e ingeniería.', 'https://web.uniroma2.it', 180),
('Università degli Studi di Milano', 'italy', (SELECT id FROM cities WHERE name = 'Milano' AND country_id = 'italy'), 'Principal universidad milanesa, reconocida por medicina, ciencias sociales y humanidades.', 'https://www.unimi.it', 160),
('Politecnico di Milano', 'italy', (SELECT id FROM cities WHERE name = 'Milano' AND country_id = 'italy'), 'Universidad técnica de élite, líder mundial en diseño, arquitectura e ingeniería.', 'https://www.polimi.it', 140),
('Università di Bologna', 'italy', (SELECT id FROM cities WHERE name = 'Bologna' AND country_id = 'italy'), 'La universidad más antigua del mundo occidental, símbolo de tradición académica europea.', 'https://www.unibo.it', 170),
('Alma Mater Studiorum – Bologna Engineering', 'italy', (SELECT id FROM cities WHERE name = 'Bologna' AND country_id = 'italy'), 'Escuela de ingeniería de la histórica Universidad de Bologna, combinando tradición e innovación.', 'https://www.unibo.it/en/academic-programmes/engineering', 190),

-- French universities
('Sorbonne Université', 'france', (SELECT id FROM cities WHERE name = 'Paris' AND country_id = 'france'), 'Universidad prestigiosa resultado de la fusión de París-Sorbonne y Pierre y Marie Curie.', 'https://www.sorbonne-universite.fr', 50),
('Université Paris Cité', 'france', (SELECT id FROM cities WHERE name = 'Paris' AND country_id = 'france'), 'Nueva universidad parisina líder en ciencias de la salud, ciencias exactas y humanidades.', 'https://u-paris.fr', 70),
('Université de Montpellier', 'france', (SELECT id FROM cities WHERE name = 'Montpellier' AND country_id = 'france'), 'Una de las universidades más antiguas de Europa, líder en medicina y ciencias naturales.', 'https://www.umontpellier.fr', 100),
('Montpellier Business School', 'france', (SELECT id FROM cities WHERE name = 'Montpellier' AND country_id = 'france'), 'Escuela de negocios de prestigio con fuerte orientación internacional y sostenibilidad.', 'https://www.montpellier-bs.com', 120),
('Université Claude Bernard Lyon 1', 'france', (SELECT id FROM cities WHERE name = 'Lyon' AND country_id = 'france'), 'Universidad científica líder en ciencias de la salud, tecnología e investigación biomédica.', 'https://www.univ-lyon1.fr', 90),
('École Normale Supérieure de Lyon', 'france', (SELECT id FROM cities WHERE name = 'Lyon' AND country_id = 'france'), 'Elite Grande École francesa, formando futuros investigadores y líderes académicos.', 'https://www.ens-lyon.fr', 45);