# gui.pm

<p align="right">
  <a href="./README.md" title="Ler o README em inglês">
    <img src="https://img.shields.io/badge/lang-en-red?style=flat-square&labelColor=202024" alt="README em inglês" />
  </a>
  <img src="https://img.shields.io/badge/lang-pt--br-gray?style=flat-square&labelColor=202024" alt="README em português" />
</p>

<p align="center">
  <a href="https://gui.pm/" title="Acessar gui.pm">
    <img src="./src/assets/guipmdev-logo.svg" alt="Logo do gui.pm" height="60" />
  </a>
</p>

<p align="center">
  <a href="https://gui.pm/">gui.pm</a> é meu currículo digital: um perfil estático, focado e interativo sobre suporte, desenvolvimento interno, diagnóstico, SQL, automações e sistemas internos.
</p>

<p align="center">
  <a href="https://github.com/guipmilek/gui.pm/commits/main">
    <img src="https://img.shields.io/github/last-commit/guipmilek/gui.pm?labelColor=202024&label=último commit" alt="Último commit" />
  </a>
  <img src="https://img.shields.io/github/repo-size/guipmilek/gui.pm?labelColor=202024&label=tamanho do repo" alt="Tamanho do repositório" />
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen?labelColor=202024&label=licen%C3%A7a" alt="Licença MIT" />
  </a>
  <a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/deploy-Vercel-black?labelColor=202024" alt="Deploy na Vercel" />
  </a>
</p>

![Captura de tela do gui.pm](./src/assets/images/cover.webp)

<p align="center">
  <a href="https://gui.pm/">Acessar o site ↗</a>
</p>

## Visão Geral

Este repositório contém o site de produção do `gui.pm`. Ele é uma aplicação Next.js com App Router usando dados estáticos locais em vez de um backend separado.

`guipm.dev` é um site separado, focado no meu trabalho técnico e em projetos. Links para `guipm.dev` nos dados de perfil/projetos são referências intencionais para esse outro site, não a identidade canônica deste website.

## Funcionalidades

- Conteúdo estático de currículo digital renderizado pelo Next.js.
- Layout mobile-first com cursor customizado e background interativo no desktop.
- Estilização com PandaCSS e arquivos gerados em `styled-system` ignorados pelo Git.
- Metadados de SEO, web manifest, favicons, redirecionamento para PDF do currículo e Vercel Analytics.
- Sem JSON Server, sem rotas locais de API e sem variáveis de ambiente obrigatórias.

## Stack

- Next.js 16 e React 19.
- TypeScript em modo estrito.
- PandaCSS para estilos e tokens de design.
- React Icons e Fluent Emoji para detalhes de interface.
- Vercel Analytics e deploy na Vercel.

## Estrutura Do Projeto

```txt
src/app/              Páginas do App Router, layout, erros e estilos da página
src/components/       Seções, cards, cursor, background e efeitos de glass
src/data/             Conteúdo estático renderizado pelo site
src/providers/        Provider estático usado pelos server components
src/theme/            Tokens, semantic tokens, estilos de texto e globais do PandaCSS
public/               Favicons, manifest, PDF do currículo e imagens públicas
```

## Requisitos

- Node.js `>=22.13.0`.
- npm, usando o `package-lock.json` versionado.

## Desenvolvimento Local

1. Instale as dependências:

```sh
npm install
```

2. Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

3. Acesse `http://localhost:3000/`.

O script `prepare` executa `panda codegen` depois da instalação. Se necessário, execute manualmente:

```sh
npm run prepare
```

## Build De Produção

```sh
npm run build
```

O script de build executa `panda codegen && next build`, garantindo que a Vercel e builds locais gerem os artefatos do PandaCSS antes de compilar o Next.js.

## Deploy Na Vercel

Configurações recomendadas na Vercel:

- Framework Preset: `Next.js`.
- Install Command: `npm install`.
- Build Command: `npm run build`.
- Output Directory: manter o padrão.
- Node.js Version: `22.x`.
- Environment Variables: nenhuma obrigatória.

O domínio canônico de produção é `https://gui.pm/`.

## Scripts

```sh
npm run dev       # Inicia o servidor local de desenvolvimento
npm run build     # Gera o PandaCSS e cria o build de produção
npm run start     # Inicia localmente o servidor Next.js de produção
npm run lint      # Executa o ESLint
npm run lint:fix  # Executa o ESLint com correções automáticas
```

## Modelo De Dados

Todos os dados do site ficam localmente em `src/data` e são acessados pelo `staticDataProvider`. A antiga camada de compatibilidade com JSON Server e as rotas `/api/*` foram removidas porque a versão final do site não consome nem expõe essa superfície de backend.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte [LICENSE](./LICENSE).

## Reconhecimentos

- Inspirado na estrutura de site-currículo da Brittany Chiang.
- Inspirado no estilo de cursor/background interativo do Adenekan Wonderful.
- Construído e mantido por [Guilherme Milék](https://gui.pm/).
