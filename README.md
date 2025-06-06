# 🧠 Gestor de Ideas Personales

Aplicación web desarrollada con **React** para gestionar ideas personales, conectada a un backend hecho con **Spring Boot** y **MySQL** como base de datos. Permite a los usuarios autenticarse, ver sus ideas, filtrarlas por estado, agregar nuevas, editarlas o eliminarlas.

---

## 🚀 Tecnologías utilizadas

- **Frontend:** React + Vite
- **Estilos:** CSS simple (inline styles), mejoras planeadas con Tailwind CSS
- **Backend:** Spring Boot (Java)
- **Base de datos:** MySQL
- **Autenticación:** JWT (manejo de tokens en localStorage)

---

## 📁 Estructura del proyecto (Frontend)
```
src/
├── components/
│ ├── AddIdeaForm.jsx
│ ├── IdeaItem.jsx
│ ├── IdeasLists.jsx
│ └── Login.jsx
├── pages/
│ ├── HomePage.jsx
│ └── LoginPage.jsx 
├── App.jsx 
└── main.jsx 
```
---
## ✅ Funcionalidades implementadas

- Autenticación de usuario (inicio de sesión y registro)
- Almacenamiento del token JWT en `localStorage`
- Redirección automática si el usuario no está autenticado
- Cierre de sesión
- Listado de ideas del usuario
- Filtrado de ideas por estado (`Pendiente`, `En progreso`, `Completada`)
- Crear nuevas ideas
- Editar título y descripción de ideas (vía `prompt`)
- Cambiar estado de ideas (con `select`)
- Eliminar ideas (con confirmación)
- Formato de fecha amigable (dd/mm/yyyy)
---

## 💻 Requisitos previos

- Node.js (v18+ recomendado)
- npm o yarn
- Backend Spring Boot corriendo en `/api` : https://github.com/Aidnalev/Proyecto-Springboot-Entornos
- Base de datos MySQL conectada correctamente al backend

---

## 📦 Instalación y ejecución del frontend

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/nombre-proyecto.git
   cd nombre-proyecto
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir el navegador en http://localhost:5173
<sub><i>(Asegúrate de que el backend de Spring Boot esté corriendo en el mismo host (o configurar el proxy si es necesario))</i></sub>
## 🧠 Autor
Desarrollado por Miguel Daniel Velandia Pinilla (Aidnalev), estudiante de Ingeniería de Sistemas.
