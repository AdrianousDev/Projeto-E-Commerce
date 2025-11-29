# Projeto CRUD FullStack + BD MySQL com Prisma | Bruno J. Adriano

Este projeto é um sistema FullStack que implementa um pequeno e-commerce capaz de sincronizar produtos automaticamente da **FakeStoreAPI**, armazená-los em um banco **MySQL** por meio do **Prisma ORM**, disponibilizar endpoints REST e exibir os produtos no front-end construído em **JavaScript puro** com **TailwindCSS**.

---

## Tecnologias Utilizadas

#### Back-End

- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **MySQL**

#### Front-End

- **JavaScript (Vanilla)**
- **TailwindCSS**

---

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/AdrianousDev/Projeto-E-Commerce
```

### 2. Instale as dependências do back-end

```bash
npm install
```

### 3. Crie o schema no MySQL

Execute no seu SGBD:

```bash
CREATE SCHEMA ecommerce;
```

#### OBS: No Desenvolvimento local foi configurado o mysql pelo terminal, criando root user e senha.

### 4. Configure o arquivo de ambiente

- **Crie um arquivo chamado .env na raiz do server-side.**
- **Preencha com suas credenciais a propriedade DATABASE_URL.**

## Rodando o projeto

### Backend

```bash
npm run dev
```

#### Agora basta abrir o index.html do client-side em seu navegador.

- **É recomendável nesse caso, abrir com a extensão Live Server do VScode. Mas fica a seu critério.**

## Estrutura do Banco de Dados (Prisma Schema)

O projeto utiliza o Prisma ORM para gerenciar o banco de dados MySQL.

Modelos implementados:

- **Cliente**
- **Produto**
- **Pedido**
- **ItemPedido**

A estrutura pode ser encontrada no arquivo schema.prisma.

# Endpoints da aplicação

Para testes de endpoints, foi utilizado a ferramenta PostMan. Com criações de variáveis para armazenar o host e a criações de Collections para melhor organização.

## Ping

#### GET /ping

- **Usado para testar as rotas do servidor. Retorna ping: true se tu estiver certinho.**

## Produto

#### GET /produtos

- **Retorna todos os produtos armazenados no banco.**
- **Sugestão de melhoria: Adicionar paginação para diminuir tempo de request.**

#### GET /produto/:id

- **Retorna um único produto da tabela Produto, com base no id passado.**
- **Sugestão de melhoria: Adicionar na response/consulta no banco, informações mais detalhadas sobre o produto.**

#### POST /produtos

- **Retorna o produto criado.**
- **Necessita enviar um body em json no corpo na requisição com o dados do produto.**

##### Exemplo de Body Request:

```bash
{
    "titulo":"Título do Produto",
    "descricao":"Descricao do produto",
    "preco":50,
    "categoria":"categoria",
    "estoque":511
}
```

#### DELETE /produto/:id

- **Deleta e retorna o produto da tabela Produto, com base no id passado.**

## Cliente

#### POST /clientes

- **Cria um cliente, passando os dados via body da requisição.**

```bash
{
  "nome":"Nome de Usuário Teste",
  "email":"usuario@teste.com"
}
```

## Categoria

#### GET /categorias

- **Consulta e retorna todos os campos da coluna categoria da tabela Produto**
- **OBS: Sem repetir valores**

## Minhas Compras

#### GET /minhas-compras

- **Retorna todos os pedidos do cliente passando o EMAIL do usuário via json body.**
- **Resposta um pouco complexa, mas muito completa.**

## Pedidos

#### POST /pedidos

- **Cria pedido, sendo necessário enviar ID do cliente, com um array chamada "produtos" com ID do produto e quantidade deles.**

```bash
{
  "clienteId": 1,
  "produtos": [
    { "id": 2, "quantidade": 1 },
    { "id": 5, "quantidade": 3 }
  ]
}
```

## Validar produtos no carrinho

#### POST /carrinho/validar

- **Retorna se é possível fazer uma compra com determina quantidade de um produto.**
- **Sugestão de melhoria: Atualmente é preciso validar 1 produto de cada vez. Talvez seja melhor criar um array com base no carrinho e verificar a disponibilidade com um único request.**

##### Exemplo de Body Request:

```bash
{
    "produtoId":1,
    "quantidade":9
}
```
