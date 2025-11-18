/**
 * Importa as funções necessárias para autenticação, interface de logout
 * e carregamento dos tipos.
 */

import { verificaAutenticacao } from "./module/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarTipos } from "./ui/tipos.js";


/**
 * Inicializa a página de tipos assim que o DOM for carregado.
 *
 * - Verifica se o usuário está autenticado.
 * - Se não estiver autenticado, interrompe o processo e redireciona para o login.
 * - Se estiver autenticado, ativa a interface de logout e carrega a lista de tipos.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!verificaAutenticacao()) {return}
    logoutUi()
    carregarTipos()
})