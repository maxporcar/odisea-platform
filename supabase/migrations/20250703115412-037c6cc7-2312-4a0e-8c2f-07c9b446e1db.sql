-- Populate universities table
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
('Alma Mater Studiorum - Bologna Engineering', 'italy', (SELECT id FROM cities WHERE name = 'Bologna' AND country_id = 'italy'), 'Escuela de ingeniería de la histórica Universidad de Bologna, combinando tradición e innovación.', 'https://www.unibo.it/en/academic-programmes/engineering', 190),

-- French universities
('Sorbonne Université', 'france', (SELECT id FROM cities WHERE name = 'Paris' AND country_id = 'france'), 'Universidad prestigiosa resultado de la fusión de París-Sorbonne y Pierre y Marie Curie.', 'https://www.sorbonne-universite.fr', 50),
('Université Paris Cité', 'france', (SELECT id FROM cities WHERE name = 'Paris' AND country_id = 'france'), 'Nueva universidad parisina líder en ciencias de la salud, ciencias exactas y humanidades.', 'https://u-paris.fr', 70),
('Université de Montpellier', 'france', (SELECT id FROM cities WHERE name = 'Montpellier' AND country_id = 'france'), 'Una de las universidades más antiguas de Europa, líder en medicina y ciencias naturales.', 'https://www.umontpellier.fr', 100),
('Montpellier Business School', 'france', (SELECT id FROM cities WHERE name = 'Montpellier' AND country_id = 'france'), 'Escuela de negocios de prestigio con fuerte orientación internacional y sostenibilidad.', 'https://www.montpellier-bs.com', 120),
('Université Claude Bernard Lyon 1', 'france', (SELECT id FROM cities WHERE name = 'Lyon' AND country_id = 'france'), 'Universidad científica líder en ciencias de la salud, tecnología e investigación biomédica.', 'https://www.univ-lyon1.fr', 90),
('École Normale Supérieure de Lyon', 'france', (SELECT id FROM cities WHERE name = 'Lyon' AND country_id = 'france'), 'Elite Grande École francesa, formando futuros investigadores y líderes académicos.', 'https://www.ens-lyon.fr', 45);