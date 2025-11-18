/**
 * Importa as funções necessárias para autenticação, interface de logout
 * e carregamento do cardápio.
 */

import { verificaAutenticacao } from "./module/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarCardapio } from "./ui/menu.js";


/**
 * Inicializa a página do cardápio assim que o DOM for carregado.
 *
 * - Verifica se o usuário está autenticado.
 * - Se não estiver autenticado, redireciona automaticamente para o login.
 * - Se estiver autenticado, ativa a interface de logout e carrega os itens do cardápio.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!verificaAutenticacao()) {return}
    logoutUi()
    carregarCardapio();
})