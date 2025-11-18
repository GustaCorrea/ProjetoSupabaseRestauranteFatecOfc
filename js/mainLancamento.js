/**
 * @file mainLancamentos.js
 * @description  Este arquivo contém 5 imports verificaAutenticacao da file moduleauth.js
 * logoutUi file ui/auth.js e carregarFormularioLancamento, carregarTabelaLancamentos, ativarBotoesAcao da file ui/lancamentos.
 * Essa file Inicializa a página protegida de lançamentos
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */

/**
 * Arquivo principal da página de Lançamentos.
 * 
 * Este módulo:
 * - Verifica se o usuário está autenticado.
 * - Ativa o botão de logout na interface.
 * - Carrega o formulário de criação/edição de lançamentos.
 * - Carrega a tabela com todos os lançamentos cadastrados.
 * - Ativa os botões de ação (editar e excluir) dos itens listados.
 */

import { verificaAutenticacao } from "./module/auth.js";
import { logoutUi } from "./ui/auth.js";
import { carregarFormularioLancamento, carregarTabelaLancamentos, ativarBotoesAcao } from "./ui/lancamentos.js";


/**
 * Inicializa a página protegida de lançamentos.
 * 
 * Este script executa as seguintes tarefas ao carregar a página:
 * 1. Verifica se o usuário está autenticado através do token salvo no navegador.
 * 2. Caso esteja autenticado, ativa o botão de logout na UI.
 * 3. Carrega o formulário para criação/edição de lançamentos.
 * 4. Carrega a tabela com todos os lançamentos cadastrados.
 * 5. Ativa os botões de ação (editar, excluir, salvar).
 * 
 * Se o usuário não estiver autenticado, é automaticamente redirecionado para a página de login.
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!verificaAutenticacao()) {return}
    logoutUi();
    carregarFormularioLancamento();
    carregarTabelaLancamentos();
    ativarBotoesAcao();
})