
# [Nest](https://github.com/nestjs/nest) framework TypeScript repository

# Client Management Api

## Prerrequisitos

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

3. Luego ejecutar el siguiente comandos para ejecutar el api:

    ```bash
    # development
    yarn run start
    
    # watch mode
    yarn run start:dev
    
    # production mode
    yarn run start:prod
    ```

## License

Nest is [MIT licensed](LICENSE).
