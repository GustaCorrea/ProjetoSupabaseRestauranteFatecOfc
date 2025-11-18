import { buscarTipos } from "../module/tipos.js";


/**
 * Carrega os tipos cadastrados e os insere na tabela da interface.
 *
 * A função faz uma requisição assíncrona para obter a lista de tipos
 * (via `buscarTipos()`), limpa o conteúdo atual da tabela e,
 * em seguida, cria dinamicamente as linhas (`<tr>`) com os dados retornados.
 *
 * @async
 * @function carregarTipos
 * @returns {<void>} Não há retorno; a função apenas manipula o DOM.
 *
 * @example
 * // Para exibir os tipos ao abrir a página:
 * document.addEventListener('DOMContentLoaded', carregarTipos)
 */

export async function carregarTipos(){
    const dados = await buscarTipos()
    const tbody = document.getElementById('tabelaTipos')
    tbody.innerHTML = ''
    dados.forEach(tipo => {
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <td class='border border-gray-400 p-2'>${tipo.descricao}</td>`
        tbody.appendChild(tr)
    })
}