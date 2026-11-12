# GuitarLA – Backend (API REST)

API REST con **Node.js + Express + Sequelize + PostgreSQL** (TypeScript) para el catálogo de guitarras del proyecto **GuitarsLA**. Solo implementa **Crear (POST)** y **Leer (GET)**.

## Requisitos

- Node.js 18 o superior
- PostgreSQL (local o en la nube, por ejemplo Render)

## Instalación

```bash
npm install
```

## Variables de entorno

```bash
cp 
.env
PORT=4000

DATABASE_URL=postgresql://pern_d1vl_user:WUVPNTGCNlgzAIMTxt2lZmBQNqzn6Gld@dpg-dbid58ifngtc73cvn830-a.oregon-postgres.render.com/pern_d1vl?ssl=true

.env.template

PORT=4000

DATABASE_URL=postgresql://pern_d1vl_user:WUVPNTGCNlgzAIMTxt2lZmBQNqzn6Gld@dpg-dbid58ifngtc73cvn830-a.oregon-postgres.render.com/pern_d1vl?ssl=true


```

| Variable       | Descripción                                                              | Ejemplo                                              |
| -------------- | ------------------------------------------------------------------------ | ---------------------------------------------------- |
| `PORT`         | Puerto del servidor                                                      |   `4000`                                               |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL                                          | `postgresql://pern_d1vl_user:WUVPNTGCNlgzAIMTxt2lZmBQNqzn6Gld@dpg-dbid58ifngtc73cvn830-a.oregon-postgres.render.com/pern_d1vl?ssl=true` |
                                                                                  

> La tabla `guitars` se crea sola al iniciar el servidor (`sequelize.sync()`).

## Arrancar el servidor

```bash
npm run dev        # desarrollo con nodemon + ts-node

Debe aparecer: `Conexión a la base de datos exitosa` y `API REST escuchando en http://localhost:4000/api`.

### (Opcional) Cargar las 12 guitarras iniciales

```bash
npm run seed
```

Inserta las guitarras del catálogo original solo si la tabla está vacía.

## Endpoints

| Método | Ruta           | Descripción                          |
| ------ | -------------- | ------------------------------------ |
| GET    | `/api/guitars` | Devuelve todas las guitarras         |
| POST   | `/api/guitars` | Registra una nueva guitarra          |

Cuerpo del POST (JSON):

```json
{
  "brand": "Fender",
  "name": "Stratocaster",
  "image": "guitarra_01",
  "description": "Guitarra eléctrica versátil",
  "price": 349.99
}
```

Validaciones (backend, `express-validator`): `name`, `image` y `description` deben ser texto y no vacíos; `image` solo admite letras, números, `-` y `_`; `price` debe ser numérico y mayor a 0. Si hay errores responde `400` con `{ "errors": [...] }`; si todo está bien, `201` con `{ "data": {...} }`.

Prueba rápida:

```bash
curl http://localhost:4000/api/guitars
curl -X POST http://localhost:4000/api/guitars -H "Content-Type: application/json" \
  -d '{"brand": "Fender","name":"Test","image":"guitarra_01","description":"Prueba","price":100}'
```

## CORS

Configurado con el paquete `cors` en `src/server.ts`: solo se aceptan los orígenes de `CORS_ORIGIN` (por defecto `http://localhost:5173`, el servidor de Vite) y los métodos `GET` y `POST`.

## Estructura

```
src/
├── config/db.ts            # conexión Sequelize
├── models/Guitar.model.ts  # modelo / tabla "guitars"
├── handlers/guitar.ts      # controladores + validaciones
├── router.ts               # rutas
├── server.ts               # Express + CORS
├── index.ts                # arranque
└── seed.ts                 # datos iniciales
```
