# APP
## Requisitos funcionais
*// funcionalidades que o app vai ter*

**Deve ser possível...**
- [ ] se cadastrar;
- [ ] se autenticar;
- [ ] obter o perfil de um usuário logado;
- [ ] obter o número de check-ins realizados pelo usuário logado;
- [ ] o usuário obter seu histórico de check-in;
- [ ] o usuário buscar academias próximas;
- [ ] o usuário buscar academias pelo nome;
- [ ] o usuário relaizar check-in na academia
- [ ] validar o check-in de um usuário
- [ ] cadastrar uma academia;

## Regras de negócio
*// condições aplicadas a cada requisito funcional*

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por admins;
- [ ] A academia só pode ser cadastrada por admins;


## Requisitos não-funcionais
*// coisas que devem existir mas que não estão ligadas a um RF*
- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados do app precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar páginadas com 20 itens por pag;
- [ ] O user deve ser identificado por um JWT;


#### commands
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
