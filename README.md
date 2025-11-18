🍽️ Supabase Restaurante 

Um aplicativo web para o gerenciamento do cardápio de um restaurante, desenvolvido como um projeto de estudo utilizando JavaScript e Supabase como backend.

🚀 Funcionalidades:

Autenticação Segura: Sistema de login e cadastro para administradores, utilizando o Supabase Auth.

Gerenciamento de Cardápio (CRUD): Permite Cadastrar, Editar e Excluir pratos do cardápio (tabela produto).

Upload de Imagens: Envio de fotos dos pratos diretamente para o Supabase Storage durante o cadastro ou edição.

Listagem Dinâmica: O cardápio na página menu.html e as tabelas de gerenciamento (lancamentos.html, produtos.html) são carregados dinamicamente a partir do banco de dados.

Segurança de Banco (RLS): Utiliza as políticas de Row Level Security do Supabase para garantir que apenas usuários autenticados possam inserir, editar ou deletar dados.

Interface Reativa: O formulário de cadastro usa SweetAlert2 para feedbacks e é capaz de alternar entre os modos "Salvar" e "Atualizar" de forma inteligente.

🛠️ Tecnologias Utilizadas:

- HTML5

- Tailwind CSS

- JavaScript

- Supabase

- Supabase Database (PostgreSQL)

- Supabase Auth

- Supabase Storage

- SweetAlert2

Como Executar o Projeto:

Abra o arquivo index.html na pasta que esta salvo os arquivos, ou execute em servidor local(recomendado) dentro do vsCode.

👨‍💻 Autores
Gustavo Correa gustavo.correa11@fatec.sp.gov.br

Isabeli Pires Quagliatto Isabeli.quagliatto@fatec.sp.gov.br