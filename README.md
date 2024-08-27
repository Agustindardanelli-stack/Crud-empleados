# Proyecto de Prueba Técnica

Este es un proyecto de prueba técnica  que es un crud de empleados . Incluye tanto un frontend como un backend para gestionar operaciones básicas de empleados.


## Descripción General

Este proyecto consta de dos partes principales:
1. **Frontend**: Una aplicación de React que permite a los usuarios ver, agregar, editar y eliminar empleados.
2. **Backend**: Una aplicación de Node.js con Express y MySQL que proporciona una API para operaciones CRUD sobre datos de empleados.

## Frontend

El frontend está construido con React y utiliza Bootstrap para el estilo. Se comunica con la API del backend para realizar varias operaciones.

### Características

- Listar empleados
- Agregar nuevos empleados
- Editar empleados existentes
- Eliminar empleados

### Tecnologías Utilizadas

- React
- Bootstrap
- Axios (para llamadas a la API)

## Backend

El backend está construido con Node.js y Express, y utiliza MySQL para el almacenamiento de datos.

### Características

- Operaciones CRUD para datos de empleados
- Endpoints de API simples para interactuar con el frontend

### Tecnologías Utilizadas

- Node.js
- Express
- MySQL
- Axios (para solicitudes de API desde el frontend)

## Configuración

### Frontend

1. Navega al directorio `frontend`:

   ```bash
   cd frontend
npm install
npm start
2. Para el backend 
```bash
   cd backend
npm install o npm i 
node index.js

3. Crea un archivo .env en el directorio backend con el siguiente contenido:
DB_HOST=tu-host-de-base-de-datos
DB_USER=tu-usuario-de-base-de-datos
DB_PASSWORD=tu-contraseña-de-base-de-datos
DB_NAME=tu-nombre-de-base-de-datos
4.Inicia el servidor:
npm start o node index.js
