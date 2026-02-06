📦 Backend — Marketplace API Imagenes de Chile.

Este backend corresponde a una API REST desarrollada en Node.js + Express + PostgreSQL, diseñada para gestionar publicaciones, usuarios y comentarios dentro de una plataforma tipo marketplace.

El sistema implementa autenticación segura mediante JWT, encriptación de contraseñas con bcrypt, y control de permisos por roles. Está estructurado siguiendo una arquitectura modular con separación entre rutas,   middlewares y acceso a base de datos, lo que facilita el mantenimiento y escalabilidad del proyecto.

La API permite:

Gestión de usuarios (registro, login, roles)

CRUD de publicaciones

Sistema de comentarios por publicación

Autenticación protegida por tokens

Middleware de autorización para administradores

Sincronización de datos a JSON para consumo externo

El backend está preparado para integrarse con un frontend moderno (React u otro cliente HTTP) y puede ejecutarse en entornos locales o de producción con configuración mediante variables de entorno.