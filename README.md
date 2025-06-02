# InfraMap-Back-end-

Este é um backend desenvolvido em **Node.js** com **Express** e **MongoDB**, que permite:

- Cadastro e autenticação de usuários (com JWT)
- CRUD de "points" (pontos geográficos)
- Upload de imagem para cada ponto
- Proteção de rotas com token JWT

---

## 🧱 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (Autenticação)
- Bcrypt (Hash de senha)
- Multer (Upload de imagens)
- Dotenv
- CORS

---

## 🔐 Rotas e Funcionalidades

### Usuários

| Método | Rota              | Descrição                 |
| ------ | ----------------- | ------------------------- |
| POST   | `/users/register` | Registra novo usuário     |
| POST   | `/users/login`    | Login e geração de token  |
| GET    | `/users/:id`      | Retorna dados do usuário  |
| PUT    | `/users/:id`      | Atualiza dados do usuário |
| DELETE | `/users/:id`      | Deleta um usuário         |

### Points

| Método | Rota                  | Descrição                       |
| ------ | --------------------- | ------------------------------- |
| POST   | `/points/createpoint` | Cria um novo point (com imagem) |
| GET    | `/points/allpoints`   | Lista todos os points           |
| GET    | `/points/:id`         | Lista os points de um usuário   |
| PUT    | `/points/update/:id`  | Atualiza um point existente     |
| DELETE | `/points/delete/:id`  | Deleta um point                 |

> ⚠️ As rotas de criação, edição e exclusão de points são protegidas com JWT.

---

## 📦 Instalação

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
node "server.js"
```

---

## ✅ Validações

- A descrição do ponto precisa ter ao menos 5 caracteres com palavras reais.
- A coordenada deve estar dentro dos limites geográficos reais.
- Não pode haver dois pontos com mesmo nome ou muito próximos (100 metros).
- A senha do usuário deve ter no mínimo 6 caracteres.
- O e-mail precisa ter formato válido.

---

## 🔒 Autenticação

- Após o login, o usuário recebe um token JWT.
- As rotas protegidas exigem o header:

```http
Authorization: Bearer <seu-token>
```

---

## ✍️ Autor

Feito por Fabricio Batista de Araujo.
