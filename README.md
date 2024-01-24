# APP

*Project status: 🏗️ building*

## Requisitos funcionais
*// funcionalidades que o app vai ter*

**Deve ser possível...**
- [X] se cadastrar;
- [X] se autenticar;
- [X] obter o perfil de um usuário logado;
- [ ] obter o número de check-ins realizados pelo usuário logado;
- [ ] o usuário obter seu histórico de check-in;
- [ ] o usuário buscar academias próximas;
- [ ] o usuário buscar academias pelo nome;
- [X] o usuário relizar check-in na academia
- [ ] validar o check-in de um usuário
- [ ] cadastrar uma academia;

## Regras de negócio
*// condições aplicadas a cada requisito funcional*

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por admins;
- [ ] A academia só pode ser cadastrada por admins;


## Requisitos não-funcionais
*// coisas que devem existir mas que não estão ligadas a um RF*
- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados do app precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar páginadas com 20 itens por pag;
- [ ] O user deve ser identificado por um JWT;


## commands
```bash
    npx tsc --init #cria tsconfig.json
```
// eslint config
```bash
    npm i eslint -D
    npx eslint --init
```
#### path config
```json
    "baseUrl": "./",                                  
    "paths": {
      "@/*": ["./src/*"]
    },  
```

#### space settings 
```json
// settings.json
    {
        "editor.formatOnSave": false,
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": "explicit"
        },
        "[prisma]": {
            "editor.formatOnSave": true
        }
    }
```

#### Fluxo de criação
1. Use case
2. Repository
3. Testes e in-memory repos

#### Prisma - ORM
- Alto nível de abstração pra trabalhar com banco de dados
model = construcao de uma tabela, no mongo seriam as collections
```bash
    ## init base prisma start files
    npx prisma init ## npx runs scrips from node_modules/bin

    ## create the migrations, tables and so on of database
    npx prisma migrate dev

    ## open an interface to see database visually
    npx prisma studio

```

#### Docker
Docker images at dockerhub
bitnami images looks to the security part more carefully

```bash
    ## create container
    sudo docker run --name your_container_name -e POSTGRESQL_USERNAME=db_username -e POSTGRESQL_PASSWORD=password -e POSTGRESQL_DATABASE=db_name -p 5432:5432 bitnami/postgresql 

    ## see containers running
    sudo docker ps ## -a(all containers)

    ## start a container
    sudo docker start container_name

    ## remove a container
    sudo docker rm container_name

    ## follow logs happening in database
    sudo docker logs api-solid-pg -f



    ### manipulating containers with docker compose
    docker compose down ## kills the containers and deletes it
    docker compose stop ## stops the container
    docker compose up -d ## starts container

```

TOSEARCH
- [ ] Migrations
- [ ] NPX
- [ ] In memory test
- [ ] Factory pattern
- [ ] TDD