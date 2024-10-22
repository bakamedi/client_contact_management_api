
# [Nest](https://github.com/nestjs/nest) framework TypeScript repository

# Client Management Api

## Pre requisitos

- Tener instalado Nestjs en tu sistema. Puedes encontrar instrucciones de instalación [aquí](https://docs.nestjs.com/).
- Si no tienes Docker instalado, puedes descargarlo e instalarlo desde [Docker’s official website][https://www.docker.com/products/docker-desktop/]
- El archivo .env puede usar el .env.example para tener una idea de como se lo puede crear y llenar los campos:

    ```bash
    DATABASE_URL=
    JWT_SECRET=
    PORT=
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    POSTGRES_PORT=
    ```

### Pasos de Instalación

1. Clona este repositorio en tu máquina local usando Git:

    ```bash
    git clone https://github.com/bakamedi/client_contact_management_api.git
    ```

2. Levanta el docker con este comando:
    ```bash
    docker-compose up -d
    ```

2. Instala las dependencias del proyecto usando YARN:

    ```bash
    yarn install
    ```

3. Crea los modelos de la BD con este comando:

    ```bash
    npx prisma migrate dev --name init --schema src/app/infra/data/prisma
    ```

3.Luego ejecutar el siguiente comandos para ejecutar el api:

    ```bash
    # development
    yarn run start
    
    # watch mode
    yarn run start:dev
    
    # production mode
    yarn run start:prod
    ```
### Cómo se podría mejorar
- ¿Cómo decidió las opciones técnicas y arquitectónicas utilizadas como parte de su solución?
    - Se decicio arquitectura limpia con casos de usos por pequeñas funciones
- ¿Qué haría de manera diferente si se le asignara más tiempo?
    - Tener casos de pruebas unitarias y usar el getUser por peticion y obtener la info del usuario
- ¿Para casos donde se deben guardar grandes cantidades de datos como por ejemplo varias fotos de alta calidad, que lógica manejaría para que la aplicación funcione de la forma más óptima?
    - Se podría usar un servicio y/o servidor solo para imágenes y la info necesaria del usuario

## License

Nest is [MIT licensed](LICENSE).
