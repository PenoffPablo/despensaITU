# despensaITU - Sistema de Gestión de Alimentos y Bodega

Este proyecto representa la migración completa y modernización del software original `IntegradorV2`. Se ha reemplazado el monolito de escritorio desarrollado en Java Swing con conexión JDBC manual por una arquitectura web moderna desacoplada en dos capas: un backend REST API con Spring Boot y un cliente web con React.

El proyecto está diseñado bajo una arquitectura de tres capas en el backend y un diseño de componentes modular en el frontend, utilizando bases de datos en memoria para facilitar su ejecución y prueba inmediata.

---

## Estructura del Repositorio

El proyecto se divide en dos directorios principales:

```text
despensaITU/
├── backend/     # API REST desarrollada en Spring Boot 3.5 con Java 25
└── frontend/    # Aplicación web desarrollada en React con Vite y Tailwind CSS v4
```

---

## Arquitectura y Tecnologías Utilizadas

### Backend (API REST)
* **Lenguaje:** Java 25
* **Framework:** Spring Boot 3.5.0
* **Gestor de Dependencias:** Gradle (con Gradle Wrapper incorporado)
* **Persistencia:** Spring Data JPA (Hibernate)
* **Base de Datos:** H2 Database Engine (ejecución en memoria RAM)
* **Validación:** Bean Validation (Jakarta Validation)
* **Otros:** Project Lombok para la reducción de código repetitivo (*boilerplate*)

### Frontend (Cliente Web)
* **Biblioteca Principal:** React
* **Herramienta de Construcción:** Vite
* **Estilado:** Tailwind CSS v4 (con tipografías Playfair Display para títulos y Outfit para cuerpo de texto)
* **Peticiones HTTP:** Fetch API nativa de JavaScript

---

## Requisitos del Sistema

Para ejecutar el proyecto localmente, es necesario contar con:
1. **Java Development Kit (JDK):** Versión 25.
2. **Node.js:** Versión 18.0.0 o superior (junto con el gestor de paquetes npm).

---

## Guía de Ejecución Local

Siga las siguientes instrucciones en terminales separadas para poner en marcha el proyecto:

### 1. Levantar el Backend (Spring Boot)

1. Abra una terminal de comandos en el directorio del backend:
   ```powershell
   cd backend
   ```
2. Ejecute el servidor de desarrollo utilizando el Gradle Wrapper provisto:
   ```powershell
   .\gradlew.bat bootRun
   ```

El servidor web embebido (Tomcat) se iniciará en el puerto **`8080`**. Al arrancar en memoria H2, la aplicación ejecutará de forma automática el archivo `import.sql` para pre-cargar la base de datos con un Gerente de prueba, una Despensa y un lote de 5 ingredientes iniciales.

#### Acceso a la Consola de la Base de Datos (H2 Console)
Para inspeccionar de forma visual las tablas generadas por JPA en la memoria RAM, ingrese en su navegador a:
* **URL:** `http://localhost:8080/h2-console`
* **JDBC URL:** `jdbc:h2:mem:restaurante`
* **Usuario:** `sa`
* **Contraseña:** *(Dejar en blanco)*

---

### 2. Levantar el Frontend (React + Vite)

1. Abra una segunda terminal en el directorio del frontend:
   ```powershell
   cd frontend
   ```
2. Instale los módulos de Node.js necesarios:
   ```powershell
   npm install
   ```
3. Inicie el servidor de desarrollo de Vite:
   ```powershell
   npm run dev
   ```

La aplicación web estará disponible ingresando en su navegador a: **`http://localhost:5173`**.

---

## Endpoints de la API REST

El backend expone los siguientes endpoints bajo la raíz `/api`:

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/ingredientes` | Recupera la lista de todos los alimentos e ingredientes en inventario |
| `GET` | `/api/ingredientes/{id}` | Obtiene la información detallada de un ingrediente específico por su ID |
| `POST` | `/api/ingredientes` | Registra un nuevo ingrediente en la despensa (Valida nombre único y stock positivo) |
| `PUT` | `/api/ingredientes/{id}` | Actualiza la cantidad de stock disponible de un ingrediente existente |
| `DELETE` | `/api/ingredientes/{id}` | Remueve un ingrediente del inventario |
| `GET` | `/api/despensa/{id}/gerente` | Recupera la información del gerente responsable asignado a la despensa |

---

## Notas de Diseño y Base de Datos

* **Mapeo de Herencia (JOINED):** La relación entre las entidades `Persona` y `Gerente` se encuentra mapeada en JPA bajo la estrategia de herencia unida (`@Inheritance(strategy = InheritanceType.JOINED)`). Esto genera dos tablas en base de datos donde la tabla `gerente` comparte la misma clave primaria que `persona` mediante una llave foránea.
* **Relación no-PK en JPA:** La entidad `Despensa` se asocia a `Gerente` a través del campo de negocio `id_gerente` (el cual no es la clave primaria de la tabla gerente). Para solventar esto en JPA, se configuró una relación `@ManyToOne` referenciando explícitamente a dicha columna y añadiendo una restricción de unicidad (`unique = true`) en la entidad `Gerente` para asegurar la integridad de la base de datos.
* **CORS Habilitado:** El backend incluye una configuración explícita de CORS permitiendo peticiones originadas desde los puertos de desarrollo por defecto de Vite (`http://localhost:5173` y `http://127.0.0.1:5173`), lo que permite el intercambio de datos fluido en entornos locales.
