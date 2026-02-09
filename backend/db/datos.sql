INSERT INTO usuarios (nombre, email, password, role)
VALUES (
  'Administrador',
  'admin@asd.cl',
  '$2b$10$.StrrLViA9x.mm0miVfF8uYhZwPN480dEXbMT6xipJ8LLuod3XQQm',
  'admin'
);
INSERT INTO usuarios (nombre, email, password, role)
VALUES (
  'AdminTest',
  'adminTest@asd.cl',
  '$2b$10$pr1EVjiwrbVyF.d8VClAYO3RSzr2CFRDN9HG.hidiCwbX574Sp.V.',
  'admin'
);

INSERT INTO publicaciones (titulo, descripcion, imagenurl, precio, usuario_id)
VALUES
('Torres del Paine', 'Parque nacional de la Patagonia chilena, famoso por sus montañas, lagos y glaciares.', 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=800&q=80', 3500, NULL),
('Desierto de Atacama', 'El desierto más árido del mundo, con paisajes únicos y cielos impresionantes.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', 2800, NULL),
('Valparaíso', 'Ciudad puerto llena de cerros, ascensores, murales y cultura.', 'https://images.unsplash.com/photo-1587502537745-84b86da1204f?auto=format&fit=crop&w=800&q=80', 2200, NULL),
('Isla de Pascua', 'Isla chilena en el Pacífico famosa por sus moáis y paisajes volcánicos.', 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80', 4200, NULL),
('Lago General Carrera', 'Uno de los lagos más grandes de Chile, conocido por las catedrales de mármol.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', 3000, NULL),
('Santiago', 'Capital de Chile, rodeada de montañas y con gran vida cultural.', 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=800&q=80', 1800, NULL),
('Chiloé', 'Isla del sur de Chile famosa por sus palafitos, iglesias y mitología.', 'https://images.unsplash.com/photo-1605120731611-0c1bc2f5c4de?auto=format&fit=crop&w=800&q=80', 2600, NULL),
('Volcán Osorno','Uno de los volcanes más icónicos de Chile.', 'https://source.unsplash.com/800x600/?volcano,chile', 3300, NULL);

