-- Populate countries table with properly escaped text
INSERT INTO public.countries (id, name, capital, continent, language, currency, population, cost_of_living, description, capital_description, student_population, flag, housing, transportation, visa_info, latitude, longitude) VALUES

-- Canada
('canada', 'Canadá', 'Ottawa', 'América del Norte', 'Inglés y Francés', 'CAD', '38 millones', 'high', 
'Canada is a vast country known for its stunning natural landscapes and vibrant multicultural cities. From the rocky peaks and turquoise lakes of the west to the historic charm of eastern provinces, international students will find a welcoming environment. English and French are the official languages, but you will hear many languages on campus due to Canada''s diversity. Canadians are famous for being friendly, polite, and inclusive.',
'Ottawa es la capital federal, una ciudad bilingüe conocida por sus museos de clase mundial y el famoso Canal Rideau.',
'1.8 millones de estudiantes internacionales', '🇨🇦', 
'Alojamiento universitario disponible, apartamentos compartidos populares entre estudiantes. Costos varían por ciudad.',
'Transporte público robusto en ciudades grandes. U-Pass estudiantil ofrece descuentos significativos.',
'Study Permit requerido para estudios mayores a 6 meses. CAQ adicional para Québec. Permite trabajo 20h/semana.',
45.4215, -75.6972),

-- Spain  
('spain', 'España', 'Madrid', 'Europa', 'Español', 'EUR', '47 millones', 'medium',
'España combina una rica historia milenaria con una vibrante cultura moderna. Los estudiantes internacionales disfrutan de un clima mediterráneo, gastronomía excepcional y una vida social muy activa. El país ofrece universidades de prestigio, costos de vida razonables y la oportunidad de aprender o perfeccionar el español.',
'Madrid es el corazón político y cultural de España, famosa por sus museos como el Prado y su vibrante vida nocturna.',
'200,000 estudiantes internacionales', '🇪🇸',
'Residencias universitarias, pisos compartidos muy comunes. Precios accesibles comparado con otros países europeos.',
'Excelente transporte público. Abono Joven ofrece descuentos para estudiantes menores de 26 años.',
'Ciudadanos UE: solo DNI. No-UE: visa de estudiante para estancias mayores a 90 días. Permite trabajo 20h/semana.',
40.4168, -3.7038),

-- Italy
('italy', 'Italia', 'Roma', 'Europa', 'Italiano', 'EUR', '60 millones', 'medium',
'Italia es la cuna del Renacimiento y hogar de algunas de las universidades más antiguas del mundo. Los estudiantes internacionales se enamoran de su rica herencia cultural, arte incomparable y gastronomía auténtica. Las universidades italianas son reconocidas mundialmente, especialmente en arte, diseño, arquitectura y humanidades.',
'Roma, la Ciudad Eterna, combina ruinas antiguas con vida moderna. Hogar del Vaticano y centro de la cultura italiana.',
'100,000 estudiantes internacionales', '🇮🇹',
'Alojamiento universitario limitado. Apartamentos compartidos muy populares entre estudiantes.',
'Transporte público eficiente en ciudades grandes. Tarjetas estudiantiles ofrecen descuentos significativos.',
'Ciudadanos UE: solo documento identidad. No-UE: visa de estudiante requerida. Permite trabajo part-time.',
41.9028, 12.4964),

-- France
('france', 'Francia', 'París', 'Europa', 'Francés', 'EUR', '67 millones', 'high',
'Francia es sinónimo de elegancia, cultura y excelencia académica. Los estudiantes internacionales descubren un país que ha dado forma a la filosofía, arte y ciencia modernos. El sistema educativo francés es reconocido mundialmente, con grandes écoles y universidades prestigiosas.',
'París, la Ciudad de la Luz, es un centro mundial de arte, moda y cultura. Hogar de la Torre Eiffel y el Louvre.',
'370,000 estudiantes internacionales', '🇫🇷',
'CROUS ofrece alojamiento universitario asequible. Apartamentos privados más costosos, especialmente en París.',
'Excelente red de transporte público. Descuentos estudiantiles significativos con tarjeta Imagine R.',
'Ciudadanos UE: libre circulación. No-UE: visa de estudiante long-stay. Campus France facilita procesos.',
48.8566, 2.3522);