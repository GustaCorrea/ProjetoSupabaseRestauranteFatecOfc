/**
 * Importa as funções necessárias para autenticação, interface de logout
 * e carregamento dos produtos.
 */

import { verificaAutenticacao } from "./module/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarProdutos } from "./ui/produtos.js";


/**
 * Inicializa a página de produtos assim que o DOM for carregado.
 *
 * - Verifica se o usuário está autenticado.
 * - Se não estiver, interrompe o carregamento e redireciona para a página de login.
 * - Se estiver, ativa a interface de logout e carrega os produtos disponíveis.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!verificaAutenticacao()) {return}
    logoutUi()
    carregarProdutos()
})