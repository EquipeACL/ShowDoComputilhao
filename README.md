[![License][license-image]][license-url] [![node](https://img.shields.io/badge/node-v8.12.0-green.svg)][node.js] [![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)][typescript]

# ShowDoComputilhao
<h3>Projeto da Disciplina de Software Educacional - UEPB.</h3>
<h4>Professor: Dr. Alysson F. Milanez.</h4>

### Sobre o Projeto
Esse projeto tem como intuito simular um jogo do Show do Milhão, mas com perguntas relacionadas ao mundo da Computação, especialmente questões do POSCOMP. Direcionado a alunos de cursos de TI.</br>

### Instalação e Execução - BackEnd
Após clonar o projeto, crie um arquivo chamado `.env`, com as seguintes informações: 
```
# Valor da porta onde o backend irá funcionar, nesse exemplo será 3000
PORT:3000  

# Url do MongoDB. Nesse exemplo, será um banco de dados local. 
# Observação: O banco de dados deverá ter o nome 'sdc'
DATABASE: mongodb://localhost:27017/sdc

```
Após isso, acesse o diretório `back-end` e em seguida utilize os comandos:

```
npm install
npm run start
```

### Testes - BackEnd
Para os testes de integração: 
```
npm run test:integration
```
Para os testes unitários:
```
npm run test:unit
```
Para todos os testes:
```
npm run test
```

### Instalação e Execução - FrontEnd
Após clonar o projeto, acesse o diretório `show-do-computilhao-ui` e em seguida utilize os comandos:
```
npm install
npm run start
```

### Pré Requisitos 

```
NodeJS 8.12
```

### Desenvolvedores:
* **Adalcino Junior** - *Desenvolvedor da Equipe ACL* 
* **Caio Lucena** - *Desenvolvedor da Equipe ACL*
* **Lucas Rocha** - *Desenvolvedor da Equipe ACL*

<h4><b>Equipe ACL</b>©. Todos os direitos reservados.</h4>


[//]: # (Links utilizados nesse arquivo.)
[license-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/EquipeACL/ShowDoComputilhao/blob/master/LICENSE
[node.js]: https://nodejs.org
[typescript]: https://www.typescriptlang.org/
