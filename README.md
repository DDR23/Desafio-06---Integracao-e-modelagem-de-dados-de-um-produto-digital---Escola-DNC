## IMPORTANTE
Esse repositório foi criado e desenvolvido para o Backend do desafio 06 da escola DNC.

Nesse `README.dm` é possivel encontrar informações sobre:

- [Etapas de desenvolvimento do desafio](#desenvolvimento)
- [Tecnologias usadas](#tecnologias)
- [Banco de dados](#banco)
- [Instalações](#instalacoes)
- [Colletion no postman](#collection)
- [Funcionalidades](#funcionalidades)
- [Exemplos de uso](#exemplos)

#### URL da API: https://api-desafio06escoladnc.vercel.app/
Obs: Essa api foi hospedada na Vercel, normalmente a vercel desliga o servidor devido inatividade, é possivel que ao entrar no link ou bater em alguma rota um erro de servidor seja retornado, caso isso aconteca, é preciso recarregar a pagina até que a vercel ligue o servidor novamente.

&nbsp;

---
<a id="desenvolvimento"></a>

# Desafio-06---Integracao-e-modelagem-de-dados-de-um-produto-digital---Escola-DNC

🎯Etapas de Desenvolvimento

### ETAPA-01 - Defina as entidades envolvidas no sistema
- Identifique os objetos e informações que serão gerenciados pelo sistema. No caso do sistema de gerenciamento de vendas online as especificações indicam que terá que criar as entidades: `produtos`, `clientes`, `vendas`, `pedidos` e `estoque`.
- Defina os atributos de cada entidade. Os atributos são as informações específicas que descrevem cada entidade. Por exemplo, a entidade `produto` pode ter atributos como `nome`, `descrição`, `preço`, por exemplo.

### ETAPA-02 - Defina as rotas da API
Definir quais rotas serão necessárias para o funcionamento da aplicação.

### ETAPA-03 - Desenvolvimento do sistema
Com a arquitetura definida, é hora de começar a desenvolver o sistema.
- Implementar as funcionalidades básicas: Comece implementando as funcionalidades básicas, como o cadastro de produtos e o registro de vendas. Certifique-se de que essas funcionalidades estejam funcionando corretamente antes de passar para as funcionalidades mais avançadas.
- Utilizar boas práticas de programação: Utilize boas práticas de programação para garantir que o código seja legível, fácil de manter e escalável. Isso inclui utilizar nomes de variáveis e funções descritivos e documentar o código.

### ETAPA-04 -  Implementação da API
Implemente as APIs definidas na arquitetura do sistema. Certifique-se de que as APIs estejam funcionando corretamente e que estejam seguindo as melhores práticas de desenvolvimento de APIs.

### ETAPA-05 - Integre sua API para testá-la
Utilize um software para testar a API, através do Insomnia. Envie as requisições HTTP para a API e verificar as respostas recebidas.

### ETAPA-05 -  Suba no Github!
É essencial que você suba seu projeto no Git e insira no Readme a imagem dos esquemas que criou no seu banco de dados com a relação das entidades!

&nbsp;

&nbsp;
<a id="tecnologias"></a>

## Tecnologias usadas
- express.js
- sequelize
- SQL
- MySQL Workbench
- Railway

&nbsp;
<a id="banco"></a>

## Banco de dados
### Script SQL
```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema desafio06-DNC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `desafio06-DNC` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `desafio06-DNC` ;

-- -----------------------------------------------------
-- Table `desafio06-DNC`.`TB_CLIENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio06-DNC`.`TB_CLIENT` (
  `CLIENT_ID` INT NOT NULL AUTO_INCREMENT,
  `CLIENT_USERNAME` VARCHAR(64) NOT NULL,
  `CLIENT_PASSWORD` VARCHAR(64) NOT NULL,
  `CLIENT_DELETED` TINYINT(1) NOT NULL DEFAULT '0',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`CLIENT_ID`),
  UNIQUE INDEX `COL_USERNAME_UNIQUE` (`CLIENT_USERNAME` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `desafio06-DNC`.`TB_PRODUCT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio06-DNC`.`TB_PRODUCT` (
  `PRODUCT_ID` INT NOT NULL AUTO_INCREMENT,
  `PRODUCT_NAME` VARCHAR(45) NOT NULL,
  `PRODUCT_DESCRIPTION` VARCHAR(200) NULL DEFAULT NULL,
  `PRODUCT_PRICE` DECIMAL(6,2) NOT NULL,
  `PRODUCT_DELETED` TINYINT(1) NOT NULL DEFAULT '0',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`PRODUCT_ID`),
  UNIQUE INDEX `PRODUCT_NAME_UNIQUE` (`PRODUCT_NAME` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `desafio06-DNC`.`TB_INVENTORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio06-DNC`.`TB_INVENTORY` (
  `INVENTORY_ID` INT NOT NULL AUTO_INCREMENT,
  `INVENTORY_QUANTITY` INT NOT NULL,
  `FK_PRODUCT_ID` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`INVENTORY_ID`),
  INDEX `fk_TB_INVENTORY_TB_PRODUCT_idx` (`FK_PRODUCT_ID` ASC) VISIBLE,
  CONSTRAINT `TB_INVENTORY_ibfk_1`
    FOREIGN KEY (`FK_PRODUCT_ID`)
    REFERENCES `desafio06-DNC`.`TB_PRODUCT` (`PRODUCT_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `desafio06-DNC`.`TB_SALE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio06-DNC`.`TB_SALE` (
  `SALE_ID` INT NOT NULL AUTO_INCREMENT,
  `SALE_PRICE` DECIMAL(8,2) NOT NULL DEFAULT '0.00',
  `FK_CLIENT_ID` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`SALE_ID`),
  INDEX `fk_TB_SALE_TB_CLIENT1_idx` (`FK_CLIENT_ID` ASC) VISIBLE,
  CONSTRAINT `TB_SALE_ibfk_1`
    FOREIGN KEY (`FK_CLIENT_ID`)
    REFERENCES `desafio06-DNC`.`TB_CLIENT` (`CLIENT_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `desafio06-DNC`.`TB_ORDER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `desafio06-DNC`.`TB_ORDER` (
  `ORDER_ID` INT NOT NULL AUTO_INCREMENT,
  `ORDER_QUANTITY` INT NOT NULL,
  `FK_SALE_ID` INT NOT NULL,
  `FK_PRODUCT_ID` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`ORDER_ID`),
  INDEX `FK_SALE_ID` (`FK_SALE_ID` ASC) VISIBLE,
  INDEX `fk_TB_ORDER_TB_SALE1_idx` (`FK_PRODUCT_ID` ASC) VISIBLE,
  INDEX `fk_TB_ORDER_TB_PRODUCT1_idx` (`FK_PRODUCT_ID` ASC) VISIBLE,
  CONSTRAINT `TB_ORDER_ibfk_1`
    FOREIGN KEY (`FK_SALE_ID`)
    REFERENCES `desafio06-DNC`.`TB_SALE` (`SALE_ID`),
  CONSTRAINT `TB_ORDER_ibfk_2`
    FOREIGN KEY (`FK_PRODUCT_ID`)
    REFERENCES `desafio06-DNC`.`TB_PRODUCT` (`PRODUCT_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

&nbsp;
### Diagrama EER
![imgBB](https://i.ibb.co/HqpZCbs/diagram-EER.png)

&nbsp;
<a id="instalacoes"></a>

## Instalações

&nbsp;
comandos para iniciar um projeto do zero

```bash
  npm init -y
```

```bash
  npm i express mysql2 sequelize cors dotenv serve-favicon
```

```bash
  npm i -D nodemon
```

&nbsp;

&nbsp;
comandos para clonar esse projeto

```bash
  git clone https://github.com/DDR23/Desafio-06---BACKEND-Integracao-e-modelagem-de-dados-de-um-produto-digital---Escola-DNC
```
```bash
  npm i
```

&nbsp;
Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env`, esse projeto as variaveis de produção foram forecidas pala Railway e as de teste pelo Workbench.

```
# AMBIENTE DE PRODUÇÃO
# DB_USER=
# DB_PASSWORD=
# DB_HOST=
# DB_PORT=
# DB_SCHEMA=

# AMBIENTE DE TESTE
DB_LOCAL_USER=root
DB_LOCAL_PASSWORD=TeRYs3_FqhXxzTP
DB_LOCAL_HOST=localhost
DB_LOCAL_PORT=3306
DB_LOCAL_SCHEMA=desafio06-dnc
```

&nbsp;
<a id="collection"></a>

## Collection no postman

&nbsp;

Link da coleção no postman
```http
https://www.postman.com/cryosat-explorer-99357718/workspace/escola-dnc/collection/30895958-276761f6-7116-4ec3-a8bf-2342f4f627f6?action=share&creator=30895958&active-environment=30895958-28b0b03e-551f-4191-a52d-affd65c1e244
```
Obs: Pode ser preciso definir o valor da variavel `{{URLbase}}` como:
```http
https://api-desafio06escoladnc.vercel.app
```

&nbsp;
<a id="funcionalidades"></a>

## Funcionalidades

[/CLIENT](#client)
- `/client/create` Cadastra um novo cliente, com username unico.
- `/client` ou `/client/:id` Visualiza todos ou um cliente.
- `/client/edit/:id` Edita os registros e retira o soft delete. Permite edição de campos separadamente, não permite que o novo username seja igual a algum ja registrado.
- `/client/delete/:id` Aplica um soft delete no cliente mantendo as referencias à este cliente em outras tabelas.

[/PRODUCT](#product)
- `/product/create`Cadastra um novo produto, com nome unico
- `/product` ou `/product/:id` Visualiza todos ou um produto
- `/product/edit/:id` Edita os registros e retira o soft delete. Permite edição de campos separadamente, não permite que o novo nome seja igual a algum ja registrado.
- `/product/delete/:id`Aplica um soft delete no produto, não altera a tabela order, porem zera quantidade desse produto na tabela inventory.

[/INVENTORY](#inventory)
- `/inventory/create` Cadastra a quantidade de um produto existente, caso o produto já exista no inventario adiciona a quantidade ao inventario existente.
- `/inventory` ou `/inventory/:id` Visualiza todos ou um inventario.
- `/inventory/edit/:id` Edita apenas a quantidade do produto. Caso o produto esteja marcado com soft delete não permite alteração até que o soft delete seja removido.
- `/inventory/delete/:id` zera o inventario.

[/SALE](#sale)
- `/sale/create` Cadastra uma nova venda, não permite criação de venda para clientes marcados com soft delete, por padrão o valor da venda é zero e nenhum valor é passado na criação.
- `/sale` ou `/sale/:id` Visualiza todas ou uma venda.
- `/sale/edit/:id` Edita o valor da venda e o cliente responsavel. Permite edição de campos separadamente.
- `/sale/delete/:id` Deleta uma venda, ao deletar uma venda todas as ordens que fazem referencia à ela são apagadas, estorna para a tabela inventory a quantidade dos produtos definidos em todas as ordens. Caso o produto esteja marcado com soft delete, retira o soft delete.

[/ORDER](#order)
- `/order/create` cadastra uma nova ordem, caso a ordem com o produto e o cliente exista, adiciona à ordem existente, ao criar uma ordem a tabela sale é atualizada com o preço vezes a quantidade do produto, não é permitido criar uma ordem com quantidade zero.
- `/order` ou `/order/:id` Visualiza todas ou uma ordem.
- `/order/edit/:id` Edita apenas a quantidade, atualiza a tabela inventory adicionando ou subtraindo a quantidade e atualiza o valor final na tabela sale.
- `/order/delete/:id` Deleta uma ordem, estorna a quantidade do produto para tabela inventory e atualiza o valor final na tabela sale. Caso o produto esteja marcado com soft delete, retira o soft delete.

&nbsp;
<a id="exemplos"></a>

## Exemplos de uso

&nbsp;
<a id='client'></a>

### /client

&nbsp;
**POST** - para inserir um novo registro
```http
https://api-desafio06escoladnc.vercel.app/client/create
```
&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "CLIENT_USERNAME": STRING,
    "CLIENT_PASSWORD": STRING
  }
```
&nbsp;

&nbsp;
**GET** - para listar todos os registros
```http
https://api-desafio06escoladnc.vercel.app/client
```
&nbsp;

&nbsp;
**GET** - para um registro pelo ID
```http
https://api-desafio06escoladnc.vercel.app/client/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;

&nbsp;
**PUT** - para editar um registro
```http
https://api-desafio06escoladnc.vercel.app/client/edit/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "CLIENT_USERNAME": STRING,
    "CLIENT_PASSWORD": STRING,
    "CLIENT_DELETED": BOOLEAN
  }
```

&nbsp;
Obs: É permitido editar valores separadamente, para desfazer o soft delete é preciso passar o valor `false`

&nbsp;
exemplo:
```json
  {
    "CLIENT_DELETED": false
  }
```

&nbsp;

&nbsp;
**DELETE** - para deletar um registro
```http
https://api-desafio06escoladnc.vercel.app/client/delete/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido


&nbsp;
<a id='product'></a>

### /product
&nbsp;
**POST** - para inserir um novo registro
```http
https://api-desafio06escoladnc.vercel.app/product/create
```
&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "PRODUCT_NAME": STRING,
    "PRODUCT_DESCRIPTION": STRING,
    "PRODUCT_PRICE": DECIMAL(6,2)
  }
```

&nbsp;

&nbsp;
**GET** - para listar todos os registros
```http
https://api-desafio06escoladnc.vercel.app/product
```
&nbsp;

&nbsp;
**GET** - para um registro pelo ID
```http
https://api-desafio06escoladnc.vercel.app/product/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;

&nbsp;
**PUT** - para editar um registro
```http
https://api-desafio06escoladnc.vercel.app/product/edit/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "PRODUCT_NAME": STRING,
    "PRODUCT_DESCRIPTION": STRING,
    "PRODUCT_PRICE": DECIMAL(6,2),
    "PRODUCT_DELETED": BOOLEAN
  }
```

&nbsp;
Obs: É permitido editar valores separadamente, para desfazer o soft delete é preciso passar o valor `false`

&nbsp;
exemplo:
```json
  {
    "PRODUCT_DELETED": false
  }
```

&nbsp;

&nbsp;
**DELETE** - para deletar um livro
```http
https://api-desafio06escoladnc.vercel.app/product/delete/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido


&nbsp;
<a id='inventory'></a>

### /inventory
&nbsp;
**POST** - para inserir um novo registro
```http
https://api-desafio06escoladnc.vercel.app/inventory/create
```
&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "INVENTORY_QUANTITY": INTEGER,
    "FK_PRODUCT_ID": INTEGER,
  }
```
&nbsp;

&nbsp;
**GET** - para listar todos os registros
```http
https://api-desafio06escoladnc.vercel.app/inventory
```
&nbsp;

&nbsp;
**GET** - para um registro pelo ID
```http
https://api-desafio06escoladnc.vercel.app/inventory/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;

&nbsp;
**PUT** - para editar um registro
```http
https://api-desafio06escoladnc.vercel.app/inventory/edit/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "INVENTORY_QUANTITY": 1000
  }
```

&nbsp;
Obs: apenas a quantidade pode ser editada.

&nbsp;

&nbsp;
**DELETE** - para deletar um registro
```http
https://api-desafio06escoladnc.vercel.app/inventory/delete/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
<a id='sale'></a>

### /sale
&nbsp;
**POST** - para inserir um novo registro
```http
https://api-desafio06escoladnc.vercel.app/sale/create
```

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "SALE_PRICE": DECIMAL(8,2),
    "FK_CLIENT_ID": INTEGER
  }
```
&nbsp;

&nbsp;
**GET** - para listar todos os registros
```http
https://api-desafio06escoladnc.vercel.app/sale
```
&nbsp;

&nbsp;
**GET** - para um registro pelo ID
```http
https://api-desafio06escoladnc.vercel.app/sale/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;

&nbsp;
**PUT** - para editar um registro
```http
https://api-desafio06escoladnc.vercel.app/sale/edit/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "SALE_PRICE": DECIMAL(8,2),
    "FK_CLIENT_ID": INTEGER
  }
```

&nbsp;
Obs: É permitido editar valores separadamente.

&nbsp;
exemplo:
```json
  {
    "SALE_PRICE": 1.99
  }
```
&nbsp;

&nbsp;
**DELETE** - para deletar um registro
```http
https://api-desafio06escoladnc.vercel.app/sale/delete/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
<a id='order'></a>

### /order
&nbsp;
**POST** - para inserir um novo registro
```http
https://api-desafio06escoladnc.vercel.app/order/create
```

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "ORDER_QUANTITY": INTEGER,
    "FK_SALE_ID": INTEGER,
    "FK_PRODUCT_ID": INTEGER
  }
```
&nbsp;

&nbsp;
**GET** - para listar todos os registros
```http
https://api-desafio06escoladnc.vercel.app/order
```
&nbsp;

&nbsp;
**GET** - para um registro pelo ID
```http
https://api-desafio06escoladnc.vercel.app/order/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;

&nbsp;
**PUT** - para editar um registro
```http
https://api-desafio06escoladnc.vercel.app/order/edit/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;
É necessário passar esse objeto no body de requisição
```json
  {
    "ORDER_QUANTITY": INTEGER
  }
```

&nbsp;
Obs: Apenas a quanitidade é permitida.

&nbsp;

&nbsp;
**DELETE** - para deletar um registro
```http
https://api-desafio06escoladnc.vercel.app/order/delete/:id
```
&nbsp;
Obs: lembre-se se subistituir o `:id` por um id valido

&nbsp;