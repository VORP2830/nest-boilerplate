# 🧱 Backend Base - NestJS Modular & Escalável

Este repositório serve como *boilerplate* robusto e escalável para aplicações backend utilizando **NestJS** com suporte a **MySQL**, arquitetura modularizada, e ambiente com Docker. Ideal para projetos que exigem organização limpa e aderência a boas práticas desde o início.

---

## 📚 Sumário

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Como Executar](#como-executar)
4. [Migrations com TypeORM](#migrations-com-typeorm)
5. [Dicas de Uso](#dicas-de-uso)
6. [Observações](#observações)

## 🚀 Tecnologias Utilizadas

* **[NestJS](https://nestjs.com/)** — framework Node.js para aplicações escaláveis.
* **[MySQL](https://www.mysql.com/)** — banco de dados relacional open source.
* **[TypeORM](https://typeorm.io/)** — ORM para TypeScript.
* **[Pino](https://getpino.io/)** — logger performático, compatível com ELK.
* **[AsyncLocalStorage (Node.js)](https://nodejs.org/api/async_hooks.html#class-asynclocalstorage)** — armazena dados da requisição (ex: `requestId`, `userId`) em contexto assíncrono, útil para logs e rastreamento.
* **[@nestjs/terminus](https://docs.nestjs.com/recipes/terminus)** — endpoints de health check plugáveis.
* **[Docker](https://www.docker.com/)** — conteinerização da aplicação.

---

## 🧩 Estrutura do Projeto

Organização pensada para máxima coesão entre módulos de negócio, separação de responsabilidades e escalabilidade a longo prazo.

```bash
src/
├── core/                               # Comportamentos globais da aplicação
│   ├── config/                         # Configurações centralizadas da aplicação
│   │   ├── db.config.ts                # Configuração do banco de dados
│   │   ├── pino.config.ts              # Configuração do logger (Pino)
│   │   └── typeorm.options.ts          # Configuração para o NestJS (via registerAs)
│   └── logger/
│       └── logger.service.ts           # Service customizado com Pino e contexto assíncrono

├── features/                           # Módulos de negócio isolados por domínio
│   └── <feature-name>/                 # Ex: user, product, order...
│       ├── <feature>.controller.ts
│       ├── <feature>.service.ts
│       ├── <feature>.module.ts
│       ├── <feature>.entity.ts
│       └── dto/
│           └── <feature>.dto.ts

├── common/                             # Recursos reutilizáveis e genéricos
│   ├── decorators/                     # Decorators customizados (ex: @User)
│   ├── guards/                         # Guards de autenticação/autorização
│   ├── filters/
│   │   └── http-exception.filter.ts    # Intercepta e padroniza respostas de erro da API
│   ├── pagination/                     # Helpers de paginação (PageParams, PageList)
│   └── interceptors/
│       ├── logging.interceptor.ts      # Interceptor que injeta contexto por requisição (requestId, userId, etc.)
│       └── timeout.interceptor.ts      # Interceptor para controlar o tempo de execução

├── migrations/                         # Migrations geradas pelo TypeORM

├── app.module.ts                       # Módulo principal da aplicação NestJS
└── main.ts                             # Bootstrap da aplicação
```

---

## ▶️ Como Executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o ambiente

Crie um `.env` na raiz com as seguintes variáveis:

```bash
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

REDIS_HOST=
REDIS_PASSWORD=
REDIS_USER=
REDIS_PORT=
REDIS_TTL=
```

### 3. Executando a aplicação

#### Local (sem Docker)

Banco de dados MySQL precisa estar rodando localmente.

```bash
npm run start:dev
```

## 🧬 Migrations com TypeORM

Esse projeto utiliza **TypeORM CLI** para versionamento de schema.

### 1. Criar nova migration (com base nas entidades)

```bash
npm run migration:generate src/migrations/NomeDaMigration
```

### 2. Aplicar migrations no banco

```bash
npm run migration:apply
```

### 3. Rollback da última migration

```bash
npm run migration:rollback
```

---

## 💡 Dicas de Uso

- 📦 Novas features? Use `nest g module nome` + `g controller` + `g service`
- 🧠 Lógica de domínio → `features/`
- ♻️ Componentes reutilizáveis → `common/`
- ❌ Evite código solto em `src/`

---

## 📌 Observações

Este repositório é uma **base genérica para APIs RESTful com NestJS**, já estruturada com boas práticas, modularização por domínio e preparada para escalar.
Não contém regras de negócio específicas — é um ponto de partida (*kickstart*) para aplicações modulares, limpas e sustentáveis.