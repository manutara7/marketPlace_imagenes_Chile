CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE publicaciones (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  imagenurl TEXT NOT NULL,
  precio INTEGER NOT NULL CHECK (precio >= 0),
  usuario_id INTEGER REFERENCES usuarios(id),
  hidden BOOLEAN DEFAULT false
);

CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  publicacion_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  comentario TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
