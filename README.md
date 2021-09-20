<h1 align="center">
    <img alt="E-Store" title="E-Store" src=".github/logo.svg" />
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#️-pré-requisitos">Pré-Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-iniciação-da-aplicação">Instalação e iniciação da aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=FF9000&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=FF9000&labelColor=000000">
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Context - (Gerenciamento de Estado)](https://pt-br.reactjs.org/docs/context.html)
- [Async-Storage](https://github.com/react-native-async-storage/async-storage)
- [Axios](https://github.com/axios/axios)
- [JSON-Server](https://github.com/typicode/json-server)
- [Styled-components](https://styled-components.com/)

## 💻 Projeto

O E-Store é um aplicativo que simula a funcionalidade de um carrinho de compras utilizado em e-commerce. 🛒

## ⚙️ Pré-requisitos

Para rodar essa aplicação, você precisará ter instalado as seguintes ferramentas [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). Além disto, é recomendado que tenha um bom editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

## 🛠 Instalação e iniciação da aplicação

Com [npm](https://www.npmjs.com/) :

```bash
# Instale as dependências
npm install
```

Ou com [yarn](https://yarnpkg.com/) :

```bash
# Instale as dependências
yarn install
```
Após instalar as dependências, você já pode estar iniciando a aplicação com [Expo](https://expo.io/) :

```bash
# Executando a aplicação
expo start
```

Observação: A configuração atual funcionará normalmente se a aplicação for executada no emulador do Android Studio.

Opcional: Dispositivo Físico (Mobile).
Caso queira executar em seu dispositivo físico, altere a config da baseURL que se encontra no arquivo `api.ts`, caminho `src/services/api.ts` para o IP de sua máquina local.
Exemplo: 
```bash
# IP da sua máquina local no lugar de 192.168.0.0
baseURL: 'http://192.168.0.0:3333',
```
Caso tenha optado por executar em seu dispositivo físico e acabado de mudar a config da baseURL, lembre-se de alterar também o script de server do `package.json` com o IP que você acabou de alterar no passo anterior,
Exemplo:
```json
"server": "json-server server.json --host 192.168.0.0 -p 3333 --delay 700"
```
Lembrando que seu dispositivo físico precisa estar conectado na mesma rede que sua máquina local.

Agora, tanto para o emulador do Android Studio, quanto para o dispositivo físico(caso tenha escolhido essa opção), será necessário deixar rodando o JSON Server antes de executar a aplicação para que tudo funcione normalmente.
Executando o JSON Server:
```bash
yarn server
```

## :memo: Licença

Esse projeto está sob a licença [MIT](LICENSE.md).

---

Feito por Rafael Quartaroli.