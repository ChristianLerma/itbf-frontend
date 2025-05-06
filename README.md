# Documentación del Proyecto: ITBF - Hoteles

## Descripción
Este proyecto es una aplicación web para la gestión de hoteles y habitaciones. Está desarrollado utilizando **React**, **TypeScript**, **Vite** y **TailwindCSS** en el frontend, y está diseñado para integrarse con una API backend (Laravel).

## Tecnologías y Lenguajes Utilizados

- ![React](https://img.shields.io/badge/-React-333333?style=flat&logo=react) **React**: Biblioteca para construir interfaces de usuario.
- ![TypeScript](https://img.shields.io/badge/-TypeScript-333333?style=flat&logo=typescript) **TypeScript**: Lenguaje de programación con tipado estático.
- ![Vite](https://img.shields.io/badge/-Vite-333333?style=flat&logo=vite) **Vite**: Herramienta de construcción rápida para proyectos frontend.
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-333333?style=flat&logo=tailwindcss) **TailwindCSS**: Framework de diseño CSS.
- ![Axios](https://img.shields.io/badge/-Axios-333333?style=flat&logo=axios) **Axios**: Cliente HTTP para realizar solicitudes a la API.
- ![React Router](https://img.shields.io/badge/-React%20Router-333333?style=flat&logo=react-router) **React Router**: Manejo de rutas en la aplicación.
- ![React Toastify](https://img.shields.io/badge/-React%20Toastify-333333?style=flat&logo=react) **React Toastify**: Biblioteca para notificaciones en tiempo real.
- ![Valibot](https://img.shields.io/badge/-Valibot-333333?style=flat) **Valibot**: Validación de datos en formularios.
- ![ESLint](https://img.shields.io/badge/-ESLint-333333?style=flat&logo=eslint) **ESLint**: Herramienta para analizar y corregir errores en el código.
- ![Prettier](https://img.shields.io/badge/-Prettier-333333?style=flat&logo=prettier) **Prettier**: Formateador de código.
- ![Node.js](https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js) **Node.js**: Entorno de ejecución para JavaScript.
- ![NPM](https://img.shields.io/badge/-NPM-333333?style=flat&logo=npm) **NPM**: Gestor de paquetes para instalar dependencias.
- ![HTML5](https://img.shields.io/badge/-HTML5-333333?style=flat&logo=html5) **HTML5**: Lenguaje de marcado para la estructura de la aplicación.
- ![CSS3](https://img.shields.io/badge/-CSS3-333333?style=flat&logo=css3) **CSS3**: Lenguaje de estilos para el diseño de la aplicación.

## Características
- Gestión de hoteles:
  - Crear, editar y eliminar hoteles.
  - Visualizar la lista de hoteles.
- Gestión de habitaciones:
  - Crear, editar y eliminar habitaciones.
  - Visualizar la lista de habitaciones asociadas a un hotel.
- Validaciones en formularios para garantizar la integridad de los datos.
- Notificaciones en tiempo real utilizando **react-toastify**.
- Diseño responsivo con **TailwindCSS**.

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd itbf-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en `.env.local`:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Previsualiza la aplicación compilada.
- `npm run lint`: Ejecuta ESLint para verificar errores de código.

## Dependencias Principales
- **React**: Biblioteca para construir interfaces de usuario.
- **React Router**: Manejo de rutas en la aplicación.
- **TypeScript**: Tipado estático para JavaScript.
- **Vite**: Herramienta de construcción rápida.
- **TailwindCSS**: Framework de diseño CSS.
- **Axios**: Cliente HTTP para interactuar con la API.
- **React Toastify**: Notificaciones en tiempo real.

## Licencia
Este proyecto está bajo la licencia MIT.
