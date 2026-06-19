# QR Studio

> Gerador de QR Code com cores personalizadas, logo central e preview em tempo real. Roda 100% no navegador — nada é enviado pra nenhum servidor.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

🔗 **Demo ao vivo:** [qrcode-studio.vercel.app](https://qrcode-studio.vercel.app) <!-- troca pelo seu link depois do deploy -->

---

## ✦ O que faz

- **Gera QR Code** a partir de qualquer texto, URL, e-mail, telefone ou vCard
- **Cores personalizadas** com paletas prontas + seletor manual (frente e fundo)
- **Logo no centro** — sobe uma imagem e ela é colada no meio do QR
- **Preview em tempo real** — o QR atualiza enquanto você digita
- **Download em PNG** com nome customizável
- **Privacidade total** — nada sai do seu navegador, sem analytics, sem cookies, sem cadastro

## ✦ Por que existe

Os geradores de QR Code online costumam ser cheios de anúncio, pedir cadastro, colocar marca d'água ou mandar seu conteúdo pra um servidor que ninguém sabe. Eu queria um que fosse rápido, bonito e respeitasse a privacidade do usuário. Então fiz.

## ✦ Stack

| Camada | Ferramenta |
|---|---|
| Framework | React 18 |
| Build / dev server | Vite 5 |
| Geração do QR | [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) |
| Estilo | CSS puro com tokens (sem framework) |
| Hospedagem | Vercel |

## ✦ Rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- npm (vem junto com o Node)

Conferir as versões:

```bash
node --version
npm --version
```

### Linux / macOS

```bash
git clone https://github.com/SEU-USUARIO/qrcode-studio.git
cd qrcode-studio
npm install
npm run dev
```

### Windows

Abre o **PowerShell** ou **Git Bash**:

```powershell
git clone https://github.com/SEU-USUARIO/qrcode-studio.git
cd qrcode-studio
npm install
npm run dev
```

Em qualquer sistema, depois disso é só abrir o endereço que aparece no terminal (geralmente `http://localhost:5173`).

### Build de produção

```bash
npm run build      # gera a pasta dist/
npm run preview    # serve o dist/ pra você testar antes do deploy
```

## ✦ Como funciona por baixo do capô

Todo o trabalho acontece no navegador. Não tem backend, não tem banco de dados, não tem API.

1. Você digita texto na caixa → o React guarda em `useState`
2. Cada vez que algo muda (texto, cor, logo), um `useEffect` dispara
3. A biblioteca `qr-code-styling` redesenha o QR no `<canvas>` HTML usando as novas opções
4. Ao clicar em "Baixar PNG", o canvas é exportado como imagem e baixado direto

Pra atravessar o caminho inteiro do código, a [`src/App.jsx`](./src/App.jsx) tem comentários explicando cada `useEffect` e o porquê dos `useRef`.

## ✦ Estrutura do projeto

```
qrcode-studio/
├── index.html              # HTML raiz + fontes
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # Entry point: monta o React no DOM
    ├── App.jsx             # Componente principal (lógica + UI)
    ├── App.css             # Estilos do componente
    └── index.css           # Reset global + tokens de design
```

## ✦ Deploy no Vercel

1. Faz fork ou cria seu próprio repo no GitHub com o código
2. Acessa [vercel.com](https://vercel.com) e faz login com GitHub
3. **Add New → Project →** seleciona o repositório
4. Clica em **Deploy** — o Vercel detecta Vite e configura tudo sozinho

Em ~30 segundos o site tá no ar. Daí em diante, cada `git push` faz redeploy automático.

## ✦ Personalizar

Quer adaptar pro seu uso? Tudo o que vale a pena mudar tá centralizado em poucos lugares:

| Quero mudar... | Onde mexer |
|---|---|
| As paletas de cor prontas | Array `PRESETS` no topo de `src/App.jsx` |
| As cores da interface | Variáveis CSS em `:root` no `src/index.css` |
| O formato dos "dots" do QR | `type: 'rounded'` na chamada `new QRCodeStyling(...)` — opções: `square`, `dots`, `classy`, `classy-rounded`, `extra-rounded` |
| Resolução do PNG baixado | `width` e `height` na config do QRCodeStyling (padrão 320, suba pra 800+ pra alta resolução) |
| Nome/logo do projeto | Bloco `<header>` em `App.jsx` |

## ✦ Roadmap

Algumas ideias pra próximas versões:

- [ ] Suporte a SVG no download (além de PNG)
- [ ] Histórico local dos últimos QRs gerados (`localStorage`)
- [ ] Templates de vCard com formulário guiado
- [ ] Modo claro / escuro
- [ ] PWA (instalável como app)

## ✦ Licença

[MIT](LICENSE) — use, modifique, distribua, faça o que quiser.

---

Feito com ☕ por [Cayo Durães](https://github.com/SEU-USUARIO).
