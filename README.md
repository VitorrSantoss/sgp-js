# Sistema de Gestão de Projetos (SGP)

Um sistema completo para gerenciamento de projetos, usuários e tarefas, desenvolvido com React e integração com API REST.

## 📋 Sobre o Projeto

O Sistema de Gestão de Projetos é uma aplicação web moderna que permite o controle completo de projetos, usuários e tarefas. Com uma interface intuitiva e recursos avançados de visualização, o sistema oferece dashboards com gráficos interativos para acompanhamento do progresso dos projetos.

## ✨ Funcionalidades

### 🔐 Autenticação
- Sistema de login seguro
- Opção de manter usuário conectado
- Controle de sessão (localStorage/sessionStorage)

### 👥 Gestão de Usuários
- Cadastro completo de usuários
- Edição e exclusão de registros
- Controle de status (Ativo/Inativo)
- Validação de dados (CPF, email, etc.)

### 📊 Gestão de Projetos
- Criação e edição de projetos
- Associação de responsáveis
- Listagem de tarefas vinculadas
- Controle de exclusão com confirmação

### ✅ Gestão de Tarefas
- Criação de tarefas com múltiplas propriedades
- Controle de prioridade (Alta, Média, Baixa)
- Acompanhamento de status (Pendente, Fazendo, Finalizada)
- Atribuição de tarefas para usuários
- Vinculação com projetos

### 📈 Dashboard Analytics
- Gráficos de barras para status das tarefas por projeto
- Gráficos de barras horizontais para prioridades
- Gráfico de pizza para status de usuários
- Visualizações responsivas e interativas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 18+ - Biblioteca principal
- **React Router DOM** - Roteamento
- **Bootstrap** 5 - Framework CSS
- **Chart.js** + **React-Chartjs-2** - Gráficos interativos
- **Axios** - Cliente HTTP

### Ferramentas de Desenvolvimento
- **Create React App** - Setup inicial
- **ES6+** - JavaScript moderno
- **CSS3** - Estilização customizada

## 📁 Estrutura do Projeto

```
src/
├── arquivos/
│   └── imagens/           # Assets e imagens
├── componentes/           # Componentes reutilizáveis
│   ├── Alerta/           # Componente de alertas
│   ├── Botao/            # Componente de botão customizado
│   ├── Cabecalho/        # Header da aplicação
│   ├── Modal/            # Componente de modal
│   └── Rodape/           # Footer da aplicação
├── contextos/            # Context API
│   └── GlobalContext.js  # Estado global da aplicação
├── mocks/                # Dados mockados
│   ├── projetos.js
│   ├── tarefas.js
│   └── usuarios.js
├── paginas/              # Páginas da aplicação
│   ├── Dashboard/        # Página principal com gráficos
│   ├── Login/            # Página de autenticação
│   ├── Pagina404/        # Página de erro 404
│   ├── Projetos/         # CRUD de projetos
│   ├── Tarefas/          # CRUD de tarefas
│   └── Usuarios/         # CRUD de usuários
├── rotas/                # Configuração de rotas
├── servicos/             # Serviços de API
│   ├── api.js           # Configuração do Axios
│   ├── projetos.js      # Endpoints de projetos
│   ├── tarefas.js       # Endpoints de tarefas
│   └── usuarios.js      # Endpoints de usuários
└── utils/                # Utilitários
    └── data.js           # Funções de formatação
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- API Backend rodando na porta 8080

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/sgp-frontend.git
   cd sgp-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure a API**
   - Certifique-se de que a API backend está rodando em `http://localhost:8080`
   - Ajuste a URL base no arquivo `src/servicos/api.js` se necessário

4. **Execute o projeto**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:3000`

## 🔧 Configuração da API

O projeto está configurado para consumir uma API REST. Certifique-se de que os seguintes endpoints estejam disponíveis:

### Endpoints Necessários

#### Usuários
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar usuário
- `GET /usuarios/{id}` - Obter usuário por ID
- `PUT /usuarios/{id}` - Atualizar usuário
- `DELETE /usuarios/{id}` - Excluir usuário

#### Projetos
- `GET /projetos` - Listar projetos
- `POST /projetos` - Criar projeto
- `GET /projetos/{id}` - Obter projeto por ID
- `PUT /projetos/{id}` - Atualizar projeto
- `DELETE /projetos/{id}` - Excluir projeto

#### Tarefas
- `GET /tarefas` - Listar tarefas
- `POST /tarefas` - Criar tarefa
- `GET /tarefas/{id}` - Obter tarefa por ID
- `PUT /tarefas/{id}` - Atualizar tarefa
- `DELETE /tarefas/{id}` - Excluir tarefa

## 📊 Recursos do Dashboard

O dashboard oferece visualizações avançadas dos dados:

- **Status das Tarefas por Projeto**: Gráfico de barras verticais mostrando a distribuição de tarefas (Pendente, Fazendo, Finalizada) para cada projeto
- **Prioridade das Tarefas por Projeto**: Gráfico de barras horizontais exibindo a distribuição de prioridades (Alta, Média, Baixa) por projeto
- **Status dos Usuários**: Gráfico de pizza mostrando a proporção de usuários ativos e inativos

## 🎨 Interface e UX

- **Design Responsivo**: Compatível com desktop, tablet e mobile
- **Bootstrap 5**: Interface moderna e consistente
- **Modais de Confirmação**: Ações críticas requerem confirmação
- **Navegação Intuitiva**: Menu principal com acesso rápido a todas as funcionalidades
- **Feedback Visual**: Alertas e mensagens informativas

## 🔒 Segurança

- Validação de formulários no frontend
- Controle de sessão de usuário
- Confirmação para ações destrutivas
- Tratamento de erros da API

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

Desenvolvido por **Vitor Santos**.

⭐ **Dê uma estrela se este projeto te ajudou!**
