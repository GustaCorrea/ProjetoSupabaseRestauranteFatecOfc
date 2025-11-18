import { buscarProdutos } from "../module/produtos.js";


/**
 * Carrega a lista de produtos buscados no banco e exibe na tabela HTML.
 *
 * A função:
 * - chama `buscarProdutos()` para obter os produtos;
 * - limpa o corpo da tabela;
 * - cria dinamicamente as linhas `<tr>` com nome e tipo do produto;
 * - insere tudo no DOM.
 *
 * @async
 * @function carregarProdutos
 * @returns {<void>} Não possui retorno; modifica diretamente o DOM.
 *
 * @example
 * // Ao carregar a página:
 * carregarProdutos();
 *
 * @throws {Error} Caso `buscarProdutos()` falhe ou retorne dados inválidos.
 */

export async function carregarProdutos(){
    const dados = await buscarProdutos()
    const tbody = document.getElementById('tabelaProdutos')
    tbody.innerHTML = '' 
    dados.forEach(produto => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class='border border-gray-400 p-2'>${produto.nome}</td>
        <td class='border border-gray-400 p-2'>${produto.tipo.descricao}</td>`
        tbody.appendChild(tr)
    })
}