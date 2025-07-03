-- Populate cities table
INSERT INTO public.cities (name, country_id, description, latitude, longitude) VALUES

-- Canadian cities
('Toronto', 'canada', 'La ciudad más grande de Canadá, centro financiero y multicultural con universidades de clase mundial.', 43.6532, -79.3832),
('Montreal', 'canada', 'Metrópoli bilingüe con encanto europeo, famosa por sus festivales y vida estudiantil vibrante.', 45.5017, -73.5673),
('Vancouver', 'canada', 'Ciudad costera rodeada de montañas, conocida por su belleza natural y diversidad cultural.', 49.2827, -123.1207),

-- Spanish cities  
('Barcelona', 'spain', 'Capital catalana famosa por la arquitectura de Gaudí, playas mediterráneas y ambiente cosmopolita.', 41.3851, 2.1734),
('Madrid', 'spain', 'Capital de España, centro político y cultural con museos de clase mundial y intensa vida nocturna.', 40.4168, -3.7038),
('Valencia', 'spain', 'Ciudad mediterránea que combina tradición y modernidad, famosa por la paella y la Ciudad de las Artes.', 39.4699, -0.3763),

-- Italian cities
('Roma', 'italy', 'La Ciudad Eterna, donde la historia antigua convive con la vida moderna en cada esquina.', 41.9028, 12.4964),
('Milano', 'italy', 'Capital de la moda y los negocios, puerta de entrada a los Alpes y centro de innovación.', 45.4642, 9.1900),
('Bologna', 'italy', 'Ciudad universitaria histórica, conocida por su gastronomía y arquitectura medieval única.', 44.4949, 11.3426),

-- French cities
('Paris', 'france', 'La Ciudad de la Luz, centro mundial de arte, cultura y gastronomía con universidades prestigiosas.', 48.8566, 2.3522),
('Montpellier', 'france', 'Ciudad universitaria del sur, combinando historia medieval con investigación de vanguardia.', 43.6108, 3.8767),
('Lyon', 'france', 'Capital gastronómica francesa, centro de investigación biomédica e innovación tecnológica.', 45.7640, 4.8357);