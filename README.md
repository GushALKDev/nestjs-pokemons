<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```bash
yarn install
```

3. Tener Nest CLI instalado globalmente
```bash
npm i -g @nestjs/cli
```

4. Ejecutar la base de datos MongoDB
```bash
docker-compose up -d
```
   - Si no tienes Docker instalado, puedes descargarlo desde [aquí](https://www.docker.com/get-started/).
   - Asegúrate de que el contenedor de MongoDB esté corriendo correctamente. Puedes verificarlo con:
```bash
docker ps
```

5. Configurar las variables de entorno
   - Clona el archivo `.env.example` a `.env` y ajusta las variables según tu entorno.
   - Asegúrate de que la URL de conexión a MongoDB sea correcta y que el puerto esté configurado correctamente. Por defecto, se usa `mongodb://localhost:27017/nest_pokemon`.

6. Ejecutar la aplicación
```bash
yarn start:dev
```
   - Esto iniciará la aplicación en modo de desarrollo, escuchando en el puerto 3000 por defecto.

7. Reconstruir la base de datos
   - Abre tu navegador y navega a `http://localhost:3000/api/v2/seed`.
   - Esto ejecutará el script de seed que poblará la base de datos con datos iniciales de Pokémon.

## Stack utilizado
- NestJS
- MongoDB
- Docker
