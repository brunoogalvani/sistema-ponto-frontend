# Sistema de Ponto – Frontend

Esse frontend foi desenvolvida como projeto pessoal em **React.js** e **Tailwind CSS** para estilizar, utilizando o **Docker** para containerização e **Nginx** para servir os conteúdos estáticos.

---

## Tecnologias

- React.js
- JavaScript
- Tailwind CSS
- Docker
- Nginx

---

## Funcionalidades

- Listar, adicionar, editar ou remover usuários
- Listar, registrar ou solicitação alteração de pontos
- Listar e processar solicitações
- Visualização de administrador do sistema

---

## Como executar o projeto

1. Suba o container:

```sh
docker-compose up -d
```

2. Para derrubar o container:

```sh
docker-compose down
```

O frontend estará disponível em http://localhost:5173.

## Comunicação com o backend

O backend está disponível no repositório: https://github.com/brunoogalvani/sistema-ponto-backend. Clone-o e suba seus containers para ter certeza de que o frontend funcionará.