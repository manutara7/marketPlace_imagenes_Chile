🖼️ YaiYo Marketplace — Frontend

Frontend de YaiYo, una plataforma tipo marketplace para publicar, visualizar y comprar imágenes.
Los usuarios pueden registrarse, iniciar sesión, crear publicaciones, comentar, agregar favoritos y gestionar un carrito de compra.

Este proyecto consume una API REST desarrollada en Node.js + PostgreSQL.

🚀 Tecnologías

⚛️ React

⚡ Vite

🎨 Bootstrap 5

🔁 React Router DOM

🌐 Context API

🔐 JWT (autenticación con backend)

💾 LocalStorage (persistencia de sesión)

📦 Instalación
npm install

▶ Ejecutar proyecto
npm run dev


El frontend se conecta por defecto a:

http://localhost:3000


(Asegúrate de tener el backend corriendo)

🧠 Funcionalidades
🌍 Público

Visualización de publicaciones

Zoom de imagen

Sistema de comentarios

Modal para iniciar sesión al intentar comentar

Registro de usuarios

Inicio de sesión

Visualización de precios en CLP

🔐 Usuario autenticado

Perfil de usuario

Crear publicaciones

Editar publicaciones propias

Eliminar publicaciones propias

Galería personal

Sistema de favoritos ❤️

Carrito de compras 🛒

Eliminación de productos del carrito

Resumen de compra

Simulación de pago

🧩 Arquitectura del proyecto
src/
├── assets/
├── components/
│   ├── Publicos/
│   └── Privados/
├── context/
│   └── userContext.jsx
├── routes/
│   └── PrivateRoute.jsx
├── views/
│   ├── Publicas/
│   └── Privadas/
├── App.jsx
├── main.jsx
└── index.css

🔐 Manejo de estado global

La aplicación usa Context API para manejar:

Usuario autenticado

Token JWT

Publicaciones

Publicaciones propias

Favoritos

Carrito de compras

Totales automáticos

La sesión se restaura automáticamente desde localStorage.

🛒 Carrito

Agregar / eliminar publicaciones

Cálculo automático de total

Contador en navbar

Simulación de pago

❤️ Favoritos

Agregar publicaciones

Eliminar favoritos

Vista en perfil

Persistencia local

💬 Comentarios

Carga automática por publicación

Comentarios protegidos por login

Modal de autenticación para usuarios no logueados

👨‍💻 Autor

Proyecto personal de desarrollo fullstack con React + Node.js.