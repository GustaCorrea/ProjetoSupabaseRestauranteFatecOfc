/**
 * @file lancamentos.js
 * @description  Este arquivo contém três imports SUPABASE_URL, API_KEY da file config.js e logout da file auth.js
 *  E as funções buscarLancamentos, adicionarLancamento, editarLancamento.
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */


/**
 * Importa as constantes de conexão e a função de logout.
 */

import { SUPABASE_URL, API_KEY } from "./config.js";
import { logout } from "./auth.js";

const token = localStorage.getItem("sb_token")


/**
 * Busca todos os lançamentos cadastrados no Supabase.
 *
 * A requisição utiliza o endpoint REST do Supabase e expande
 * automaticamente o relacionamento com o produto, retornando o nome.
 *
 * Caso o token seja inválido (erro 401), o usuário é deslogado.
 *
 * @async
 * @function buscarLancamentos
 * @returns {<Array>} Lista de lançamentos retornada pelo Supabase.
 */

// Buscar lançamentos
export async function buscarLancamentos() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lancamentos?select=*,produto(nome)`, {
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${token}`
      }
    });
    if (res.status === 401) {
      logout()
    }
    return res.json();
  }


/**
 * Adiciona um novo lançamento no banco de dados.
 *
 * Envia os dados em formato JSON ao endpoint REST do Supabase.
 * Caso o retorno seja 201 (Created), considera que o cadastro foi bem-sucedido.
 *
 * Caso o Supabase retorne outro erro, tenta extrair a mensagem detalhada
 * e lança uma exceção com descrição adequada.
 *
 * @async
 * @function adicionarLancamento
 * @param {Object} lancamento - Objeto contendo os dados do lançamento.
 * @returns {<boolean|Object>} True em caso de sucesso ou objeto retornado pelo Supabase.
 * @throws {Error} Lança erro com mensagem detalhada quando a requisição falha.
 */

  // Adicionar lançamento
export async function adicionarLancamento(lancamento) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lancamentos`, {
      method: "POST",
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lancamento)
    });
    if (res.status === 201) { return true; }

    if (res.ok) { return res.json(); }

    try {
        const errorBody = await res.json();
        throw new Error(errorBody.message || `Erro do servidor: Status ${res.status}`);
      } 
      catch (e) { throw new Error(`Falha na requisição: Status ${res.status}`); }
}


/**
 * Atualiza os dados de um lançamento já existente.
 *
 * Utiliza método HTTP PUT com filtro por ID no Supabase.
 * Retorno 204 significa atualização concluída com sucesso.
 *
 * Caso o Supabase retorne erro, tenta extrair a mensagem do corpo
 * da resposta para gerar uma exceção mais clara.
 *
 * @async
 * @function editarLancamento
 * @param {number|string} id - ID do lançamento que será atualizado.
 * @param {Object} dados - Dados que serão atualizados.
 * @returns {<boolean|Object>} True em caso de sucesso ou objeto retornado pelo Supabase.
 * @throws {Error} Lança erro com explicação quando a requisição falha.
 */

// Editar lançamento
export async function editarLancamento(id, dados) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/lancamentos?id=eq.${id}`, {
      method: "PUT",
      headers: {
        "apikey": API_KEY,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    if (res.status === 204) { return true; }
  
    if (res.ok) { return res.json(); }
  
    try {
      const errorBody = await res.json();
      throw new Error(errorBody.message || `Erro do servidor: Status ${res.status}`);
    } 
    catch (e) { throw new Error(`Falha na requisição: Status ${res.status}`); }
  }


  