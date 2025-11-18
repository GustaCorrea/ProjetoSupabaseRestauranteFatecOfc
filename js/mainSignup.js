/**
 * Importa a função responsável por inicializar a interface de cadastro
 * do usuário.
 */

import { signUpUi } from "./ui/auth.js";


/**
 * Inicializa a página de cadastro assim que o DOM for carregado.
 *
 * - Ativa a interface de cadastro para permitir que o usuário crie uma conta.
 *
 * @event DOMContentLoaded
 * @returns {void}
 */

document.addEventListener('DOMContentLoaded', () => {
    signUpUi()
})