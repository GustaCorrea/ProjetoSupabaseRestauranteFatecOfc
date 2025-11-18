/**
 * Inicializa a tela de login ao carregar a página.
 *
 * Este módulo importa e executa a função responsável por configurar a interface
 * e eventos do formulário de autenticação.  
 * A função `loginUi()` cuida de capturar o email, senha, validações,
 * envio dos dados e exibição de mensagens ao usuário.
 */

import { loginUi } from "./ui/auth.js";


/**
 * Aguarda o carregamento completo do DOM e então executa a função
 * que monta e ativa a interface de login.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */

document.addEventListener('DOMContentLoaded', () => {
    loginUi()
})