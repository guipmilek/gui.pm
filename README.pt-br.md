<!-- ===== HEADER ===== -->
<p align="right">
  <a href="./README.md" title="Read the README in english">
    <img
      src="https://img.shields.io/badge/lang-en-red?style=flat-square&labelColor=202024"
      alt="lang-en"
    />
  </a>
  <img
    src="https://img.shields.io/badge/lang-pt--br-gray?style=flat-square&labelColor=202024"
    alt="lang-pt-br"
  />
</p>

<p align="center">
  <a
    href="https://guipm.dev/"
    title="Acessar a aplicação web"
  >
    <img
      src="./src/assets/guipmdev-logo.svg"
      alt="Logo do Guipm.dev"
      height="60px"
    />
  </a>
</p>

<h1 align="center">GUIPM.DEV</h1>

<p align="center">
  <img
    src="https://img.shields.io/github/languages/count/guipmdev/guipm-dev?color=%2304D361&labelColor=202024&label=linguagens"
    alt="Contagem de linguagens do repositório"
  />
  <img
    src="https://img.shields.io/github/repo-size/guipmdev/guipm-dev?labelColor=202024&label=tamanho do repo"
    alt="Tamanho do repositório"
  />
  <img
    src="https://img.shields.io/github/commit-activity/m/guipmdev/guipm-dev?color=black&labelColor=202024&label=atividade de commits"
    alt="Atividade de commits"
  />
  <a
    href="https://github.com/guipmdev/guipm-dev/commits/main"
    title="Visualizar commits do repositório"
  >
    <img
      src="https://img.shields.io/github/last-commit/guipmdev/guipm-dev?labelColor=202024&label=último commit"
      alt="Último commit"
    />
  </a>
  <a href="./LICENSE" title="Visualizar licença do projeto">
    <img
      src="https://img.shields.io/badge/license-MIT-brightgreen?labelColor=202024&label=licen%C3%A7a"
      alt="Licença do projeto"
    />
  </a>
  <a href="https://guipm.dev/" title="Acessar o site do guipm.dev">
    <img
      src="https://img.shields.io/badge/Layout_by-guipm.dev-005D85?labelColor=202024"
      alt="Designer do layout"
    />
  </a>
</p>

![Captura de tela da página inicial da aplicação](./src/assets/images/cover.webp)

<p align="center">
  <a href="https://guipm.dev/"
    >Acessar a aplicação web ↗</a
  >
</p>

<details>
  <summary>
    <h2>📒 Índice</h2>
  </summary>

- [📍 Visão geral](#-visão-geral)
  - [⚠️ Aviso](#️-aviso)
- [✨ Funcionalidades](#-funcionalidades)
- [🤖 Demo](#-demo)
- [🎨 Layout](#-layout)
- [🛠 Tecnologias](#-tecnologias)
  - [Website](#website)
  - [Server](#server)
  - [Úteis](#úteis)
- [🚀 Primeiros passos](#-primeiros-passos)
  - [✔️ Pré-requisitos](#️-pré-requisitos)
  - [📦 Instalação](#-instalação)
  - [⚙️ Utilização](#️-utilização)
- [📄 Licença](#-licença)
- [👏 Reconhecimentos](#-reconhecimentos)
</details>

<!-- ===== PROJECT INFOS ===== -->

## 📍 Visão geral

Esse projeto é uma aplicação web desenvolvida em _Next.js_ e _TypeScript_ para o meu site de portfólio pessoal. Ele inclui as seções Sobre, Experiência, Projeto, além de um Cursor personalizado para proporcionar uma experiência interativa ao usuário.

O projeto se conecta com uma API para buscar os dados usados no website, e usa CSS-in-JS para estilizar os seus componentes. No geral, é uma plataforma visualmente atraente e interativa que mostra o trabalho e a experiência do seu desenvolvedor.

### ⚠️ Aviso

O back-end desse website foi desenvolvido em _JSON Server_ e não está incluso nesse repositório. **Para testar essa aplicação na sua máquina, você precisará clonar ambos os repositórios (front e back)**, fazer as respectivas configurações e executar os scripts, mas tudo está em detalhes na seção de [⚙️ Utilização](#️-utilização)!

## ✨ Funcionalidades

🖱️ **Cursor personalizado** para uma experiência mais imersiva

⚡ **Foco na velocidade** de carregamento

📱 Feito em **mobile first**, ou seja, ótima visualização em dispositivos móveis

🌑 **Dark mode sempre**, para ficar com os olhos tranquilos

⚙ **Construído com SSR**, então mesmo sem JavaScript todas as informações ficam visíveis

👍 Feito pensando em **acessibilidade e SEO**

## 🤖 Demo

https://github.com/guipmdev/guipm-dev/assets/136738335/135996b2-4aa8-41fc-9aa8-91cd35d3646f

## 🎨 Layout

O layout da aplicação foi projetado por **guipm.dev** e está disponível no [Figma](https://www.figma.com/file/HjCbKGCHj9xffchp1dNpy0/Personal-website).

<p align="center">
  <img
    src="./src/assets/images/layout-cover.webp"
    alt="Imagem de capa do layout da aplicação web"
    width="50%"
  />
</p>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas para desenvolver esse projeto:

### Website

<p>
  <a href="https://nextjs.org/">
    <img
      src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js"
      alt="Next.js"
    />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img
      src="https://img.shields.io/badge/TypeScript-white?style=for-the-badge&logo=TypeScript"
      alt="TypeScript"
    />
  </a>
  <a href="https://eslint.org/">
    <img
      src="https://img.shields.io/badge/ESLint-101828?style=for-the-badge&logo=ESLint"
      alt="ESLint"
    />
  </a>
  <a href="https://github.com/rocketseat/eslint-config-rocketseat">
    <img
      src="https://img.shields.io/badge/Rocketseat_ESLint_config-gray?style=for-the-badge"
      alt="Rocketseat ESLint config"
    />
  </a>
</p>

<p>
  <a href="https://elbywan.github.io/wretch/">
    <img
      src="https://img.shields.io/badge/Wretch-gray?style=for-the-badge"
      alt="Wretch"
    />
  </a>
  <a href="https://usehooks-ts.com/">
    <img
      src="https://img.shields.io/badge/usehooks--ts-gray?style=for-the-badge"
      alt="usehooks-ts"
    />
  </a>
  <a href="https://sharp.pixelplumbing.com/">
    <img
      src="https://img.shields.io/badge/sharp-2f3136?style=for-the-badge&logo=sharp"
      alt="sharp"
    />
  </a>
  <a href="https://vercel.com/">
    <img
      src="https://img.shields.io/badge/Vercel-2f3136?style=for-the-badge&logo=vercel"
      alt="Vercel"
    />
  </a>
</p>

<p>
  <a href="hhttps://panda-css.com/">
    <img
      src="https://img.shields.io/badge/Panda_CSS-fde047?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjc2MDggMC4zOTA2NjlDOS4zODYxMyAtMC4wMTI2MTI3IDcuOTgzOTYgLTAuMDY3NDI2IDYuNTU1MDYgMC4wNjMwODgxQzUuNzU1NDIgMC4xNDc5NDUgNC45ODY2NyAwLjMxMDA1NCA0LjI0NTE4IDAuNTk0NTA5QzIuNjQyNDQgMS4yMDkzNiAxLjQzOTAzIDIuMjc0MjQgMC43MjE0NyAzLjg3NzU0QzAuMjA3MDMzIDUuMDI2OTggMC4wMjExMTA5IDYuMjQ4MDIgMC4wMDE3MzQ3IDcuNTAwODFDLTAuMDE4NzQyNCA4LjgyNDggMC4xNDM3MTcgMTAuMTMwNSAwLjQwMTg2MiAxMS40MjQ5QzAuNjM1ODUyIDEyLjU5ODMgMC45NDc0NjMgMTMuNzQ4NyAxLjM5MjQ5IDE0Ljg1OTFDMS40MzQ3NyAxNC45NjQ2IDEuNDg3NDMgMTUuMDAwMiAxLjYwMDI4IDE1QzMuMDA3OCAxNC45OTY5IDQuNDE1MzMgMTQuOTk2OSA1LjgyMjg2IDE0Ljk5NjlDNi4yMzk1NSAxNC45OTY5IDYuNjU2MjMgMTQuOTk2OSA3LjA3MjkyIDE0Ljk5NjhDNy4xMDQ4MyAxNC45OTY4IDcuMTM2NzMgMTQuOTk1IDcuMTczNDIgMTQuOTkzQzcuMTkyMTUgMTQuOTkxOSA3LjIxMjEzIDE0Ljk5MDggNy4yMzM5OSAxNC45ODk4QzcuMjI1NTMgMTQuOTY5MyA3LjIxNzk2IDE0Ljk1MDQgNy4yMTA4NyAxNC45MzI3QzcuMTk2OTIgMTQuODk3OSA3LjE4NDc5IDE0Ljg2NzYgNy4xNzEyNSAxNC44MzhDNy4wNjk0NyAxNC42MTU2IDYuOTY1NTggMTQuMzk0MiA2Ljg2MTY5IDE0LjE3MjhDNi42MzYzNSAxMy42OTI0IDYuNDExMDEgMTMuMjEyMSA2LjIwNzIxIDEyLjcyMjRDNS41ODkxIDExLjIzNzMgNS4xMTU3NSA5LjcwODIgNC45NzEzIDguMDg5NTlDNC45MDc1NiA3LjM3NTQxIDQuOTE2NDEgNi42NjUzMSA1LjExMDQ0IDUuOTY5NDFDNS4zMzIyMiA1LjE3Mzk2IDUuODA4MTQgNC42MTI0IDYuNTk3MTUgNC4zNzc2M0M3LjMyMTY4IDQuMTYyMDQgOC4wNTYyOSA0LjE2MzQ2IDguNzc2ODggNC40MDE0NEM5LjQyIDQuNjEzODMgOS44MzkzIDUuMDYyNDggMTAuMDE3NiA1LjczNDIzQzEwLjE1NDYgNi4yNTAxMyAxMC4xNTQ2IDYuNzcxNTkgMTAuMDUxIDcuMjkxNjlDOS45NzExNSA3LjY5MjE0IDkuODEwNTEgOC4wNTc1NiA5LjUyMTM3IDguMzQ5ODhDOS4wMDI3MSA4Ljg3NDIzIDguMzU0OTUgOC45OTQ4IDcuNjU5OSA4Ljk1NDYyQzcuNTM2MjQgOC45NDc0NyA3LjQxMjk1IDguOTMzNjIgNy4yODU5MiA4LjkxOTM2QzcuMjI2NDIgOC45MTI2NyA3LjE2NjA5IDguOTA1OSA3LjEwNDUyIDguODk5NjhDNy4xMDYyOSA4LjkxOTc3IDcuMTA3MjcgOC45MzgyOCA3LjEwODE5IDguOTU1NjJDNy4xMDk5OSA4Ljk4OTczIDcuMTExNTYgOS4wMTkzMSA3LjExODQzIDkuMDQ3NTVDNy4xNDgwNSA5LjE2OTEzIDcuMTc2MjcgOS4yOTExNSA3LjIwNDUgOS40MTMxOUM3LjI3MjQ5IDkuNzA3MTUgNy4zNDA1IDEwLjAwMTIgNy40Mjc5MyAxMC4yODlDNy41OTk2MSAxMC44NTQyIDcuNzk5MjUgMTEuNDA1OCA4LjAyNTU2IDExLjk0NDNDOS42Mzg4MyAxMS44MTU4IDExLjEyNDggMTEuNDA2MiAxMi43MDE5IDEwLjQzOTNDMTIuNzI1NiAxMC40MjQxIDEyLjc0NzEgMTAuNDEwMyAxMi43Njg2IDEwLjM5NjZDMTMuNDQ2MSA5Ljk2NTg3IDEzLjk5NDQgOS40MDcxMiAxNC4zNzI1IDguNjg1NjNDMTQuOTg0OCA3LjUxNzI1IDE1LjEwNDIgNi4yNjc3NyAxNC45MjIzIDQuOTc4MDhDMTQuNzM0NSAzLjY0NzEyIDE0LjE0OTcgMi41Mjk5MyAxMy4xNDI5IDEuNjUzNkMxMi40NDQ2IDEuMDQ1OCAxMS42MzcxIDAuNjQ3NzQ2IDEwLjc2MDggMC4zOTA2NjlaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4="
      alt="Panda CSS"
    />
  </a>
  <a href="https://react-icons.github.io/react-icons/">
    <img
      src="https://img.shields.io/badge/React_Icons-1d2021?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2MDBweCIgaGVpZ2h0PSI2MDBweCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYwMCA2MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0U5MUU2MyIgc3Ryb2tlLXdpZHRoPSIyNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMzcxLjk4NywyMjcuNjQxICAgYzQ3LjYyOCw0Ny42MjgsODUuMDM5LDk4LjcwOCwxMDYuOTE0LDE0My41NTJjMjYuMzU4LDU0LjAzMywzMC4wOTYsOTkuNzIyLDExLjEwMywxMTguNzE0ICAgYy0xOS43OTMsMTkuNzkzLTY4LjI2NywxNS44ODQtMTI1LjczMS0xMi45NzljLTQzLjQ0NS0yMS44MjEtOTIuMDMxLTU5LjExOS0xMzcuMjQyLTEwNC4zMzEgICBjLTQ2LjM1NC00Ni4zNTQtODQuOTUtOTUuNTQ1LTEwNi42NjctMTM5LjgxNmMtMjcuNDgtNTYuMDIzLTMwLjA1Ny0xMDMuNzQzLTEwLjY0My0xMjMuMTU3ICAgYzE4LjgzOC0xOC44MzksNjMuMjQ4LTE2LjA1NiwxMTYuNjk0LDkuNzU3QzI3MS41NzQsMTQxLjE5MywzMjMuODk1LDE3OS41NDgsMzcxLjk4NywyMjcuNjQxeiIvPg0KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0U5MUU2MyIgc3Ryb2tlLXdpZHRoPSIyNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjcyLjkzMSwyMDEuMTI1ICAgYzY1LjA1Mi0xNy40NjUsMTI3Ljk4OS0yNC4zNTQsMTc3Ljc2Ny0yMC45MDJjNTkuOTc0LDQuMTYsMTAxLjQyLDIzLjc0NywxMDguMzg1LDQ5LjY4OCAgIGM3LjI1OSwyNy4wMzMtMjAuMzQ1LDY3LjA3My03NC4wNTQsMTAyLjQzNGMtNDAuNjA4LDI2LjczMy05Ny4xODksNTAuMTg4LTE1OC45NDEsNjYuNzY5ICAgYy02My4zMTIsMTYuOTk4LTEyNS4yMDcsMjUuODU4LTE3NC40MDgsMjIuNTUzYy02Mi4yNi00LjE4MS0xMDQuODg0LTI1Ljc4OS0xMTIuMDA0LTUyLjMwNiAgIGMtNi45MDctMjUuNzMxLDE3LjY4OC02Mi44MTEsNjYuNzUtOTYuMjE0QzE0Ny44NzksMjQ0LjkyMywyMDcuMjQzLDIxOC43NjEsMjcyLjkzMSwyMDEuMTI1eiIvPg0KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0U5MUU2MyIgc3Ryb2tlLXdpZHRoPSIyNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMjAwLjQ2OSwyNzMuNzA3ICAgYzE3LjM1Ny02NS4wODEsNDIuODItMTIzLjA1LDcwLjY3MS0xNjQuNDVjMzMuNTU2LTQ5Ljg4Miw3MS4yMjUtNzYuMDA4LDk3LjE3OC02OS4wODZjMjcuMDQ1LDcuMjEyLDQ3Ljk0OSw1MS4xMjMsNTEuNzYsMTE1LjMxNSAgIGMyLjg4Myw0OC41MzMtNS4wNTUsMTA5LjI2Ni0yMS41MzEsMTcxLjA0NmMtMTYuODkyLDYzLjM0MS00MC4xMjYsMTIxLjM4OS02Ny41NjIsMTYyLjM2NSAgIGMtMzQuNzE2LDUxLjg1Mi03NC43MjMsNzcuOTg4LTEwMS4yNTIsNzAuOTEzYy0yNS43NDMtNi44NjUtNDUuNTg0LTQ2LjY5Mi01MC4wMjEtMTA1Ljg4MSAgIEMxNzUuOTYzLDQwMy45MiwxODIuOTQ0LDMzOS40MjQsMjAwLjQ2OSwyNzMuNzA3eiIvPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzMiPg0KCTxwYXRoIGZpbGw9IiNFOTFFNjMiIGQ9Ik0zMDAsMzQ5LjM2OWMtMS4wMTksMC0xLjg4MS0wLjM1My0yLjU4Ni0xLjA1OGwtMzYuNjc5LTM1LjM4NmMtMC4zOTItMC4zMTMtMC45MzEtMC44MjItMS42MTctMS41MjggICBjLTAuNjg2LTAuNzA1LTEuNzczLTEuOTg4LTMuMjYyLTMuODUxYy0xLjQ4OS0xLjg2LTIuODIyLTMuNzcxLTMuOTk3LTUuNzNzLTIuMjI0LTQuMzMtMy4xNDUtNy4xMTIgICBjLTAuOTItMi43ODItMS4zODEtNS40ODYtMS4zODEtOC4xMTFjMC04LjYyMSwyLjQ4OC0xNS4zNjEsNy40NjUtMjAuMjIxYzQuOTc3LTQuODU5LDExLjg1NC03LjI4OSwyMC42MzEtNy4yODkgICBjMi40MywwLDQuOTA5LDAuNDIxLDcuNDM2LDEuMjY0YzIuNTI3LDAuODQzLDQuODc5LDEuOTc5LDcuMDU0LDMuNDFjMi4xNzQsMS40Myw0LjA0NiwyLjc3Miw1LjYxMyw0LjAyNnMzLjA1NywyLjU4Niw0LjQ2NywzLjk5NyAgIGMxLjQxMS0xLjQxMSwyLjg5OS0yLjc0Myw0LjQ2Ny0zLjk5N2MxLjU2OC0xLjI1NCwzLjQzOC0yLjU5Niw1LjYxNC00LjAyNmMyLjE3NS0xLjQzMSw0LjUyNS0yLjU2Nyw3LjA1NC0zLjQxICAgYzIuNTI3LTAuODQyLDUuMDA2LTEuMjY0LDcuNDM1LTEuMjY0YzguNzc4LDAsMTUuNjU1LDIuNDMsMjAuNjMyLDcuMjg5YzQuOTc4LDQuODU5LDcuNDY2LDExLjYsNy40NjYsMjAuMjIxICAgYzAsOC42Ni00LjQ4NywxNy40NzctMTMuNDYxLDI2LjQ1MWwtMzYuNjE5LDM1LjI2OEMzMDEuODgxLDM0OS4wMTcsMzAxLjAxOSwzNDkuMzY5LDMwMCwzNDkuMzY5eiIvPg0KPC9nPg0KPC9zdmc+"
      alt="React Icons"
    />
  </a>
  <a href="https://www.radix-ui.com/">
    <img
      src="https://img.shields.io/badge/Radix_UI-1a181c?style=for-the-badge&logo=radixui"
      alt="Radix UI"
    />
  </a>
</p>

_\* Confira o arquivo [<kbd>package.json</kbd>](./package.json)_

### Servidor

<p>
  <a href="https://github.com/typicode/json-server">
    <img
      src="https://img.shields.io/badge/JSON_Server-gray?style=for-the-badge"
      alt="JSON Server"
    />
  </a>
  <a href="https://github.com/typicode/nodemon">
    <img
      src="https://img.shields.io/badge/nodemon-2b2922?style=for-the-badge&logo=nodemon"
      alt="nodemon"
    />
  </a>
</p>

### Úteis

<p>
  <a href="https://git-scm.com/">
    <img
      src="https://img.shields.io/badge/Git-f1f1e9?style=for-the-badge&logo=git"
      alt="Git"
    />
  </a>
  <a href="https://nodejs.org/">
    <img
      src="https://img.shields.io/badge/Node.js-233056?style=for-the-badge&logo=node.js"
      alt="Node.js"
    />
  </a>
  <a href="https://figma.com/">
    <img
      src="https://img.shields.io/badge/Figma-white?style=for-the-badge&logo=figma"
      alt="Figma"
    />
  </a>
  <a href="https://fonts.google.com/">
    <img
      src="https://img.shields.io/badge/Google_Fonts-white?style=for-the-badge&logo=google-fonts"
      alt="Google Fonts"
    />
  </a>
  <a href="https://code.visualstudio.com/">
    <img
      src="https://img.shields.io/badge/VSCode-005293?style=for-the-badge&logo=visual-studio-code"
      alt="VSCode"
    />
  </a>
</p>

## 🚀 Primeiros passos

### ✔️ Pré-requisitos

Antes de você começar, certifique-se que você tem as seguintes ferramentas instaladas na sua máquina: [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download). Também é bom ter um editor para trabalhar com o código, como o [VSCode](https://code.visualstudio.com/Download).

### 📦 Instalação

1. Clone o [repositório do back end](https://github.com/guipmdev/guipm-dev-json-server/):

```sh
git clone https://github.com/guipmdev/guipm-dev-json-server/
```

2. Mude para o diretório do back end:

```sh
cd guipm-dev-json-server
```

3. Instale as dependências:

```sh
npm install
```

4. Volte e clone o repositório do projeto:

```sh
cd ..

git clone https://github.com/guipmdev/guipm-dev/
```

5. Mude para o diretório do projeto:

```sh
cd guipm-dev
```

6. Instale as dependências:

```sh
npm install
```

### ⚙️ Utilização

1. Entre no diretório do back end:

```sh
cd guipm-dev-json-server
```

2. Inicie o JSON Server:

```sh
npm run dev
```

3. Mude para o diretório do projeto:

```sh
cd ../guipm-dev
```

4. Renomeie o arquivo `.env.local.example` para `.env.local` e insira as informações necessárias:

```sh
mv .env.local.example .env.local
```

1. Execute o script de codegen do Panda:

```sh
npm run prepare
```

6. Inicie a aplicação web:

```sh
npm run dev
```

7. Acesse http://localhost:3000/ para visualizar a aplicação

## 📄 Licença

Este projeto está licenciado de acordo com os termos da licença `MIT`. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.

## 👏 Reconhecimentos

> - Muito obrigado à [Rocketseat](https://www.rocketseat.com.br/) pelas dicas que recebi até aqui
> - Créditos à dev [Brittany Chiang](https://brittanychiang.com/) pelo estilo de site-currículo
> - Créditos ao dev [Adenekan Wonderful](https://www.codewonders.dev/) pelo estilo de cursor e background da aplicação

<!-- ===== FOOTER ===== -->

---

<p align="center">
  Feito com 💙 por
  <a href="https://www.guipm.dev/"> @guipm.dev </a>
  - Fique à vontade para
  <a href="mailto:guipm.dev@gmail.com">entrar em contato comigo</a>!
</p>

<br />

<p align="center">
  <a href="#top">
    <b>↑&nbsp;&nbsp; Voltar ao topo &nbsp;&nbsp;↑</b>
  </a>
</p>
