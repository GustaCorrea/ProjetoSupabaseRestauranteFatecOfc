import { buscarProdutos } from "../module/produtos.js";


/**
 * Formata um valor numérico para moeda brasileira (BRL).
 *
 * @param {number} preco - O valor numérico que será formatado.
 * @returns {string} O valor formatado no padrão brasileiro (ex: "R$ 12,50").
 */

// Função para formatar o valor para BRL
function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


/**
 * Carrega dinamicamente os produtos do banco e exibe no grid do cardápio.
 *
 * - Busca os produtos no Supabase.
 * - Exibe cada produto em um card com imagem, nome, descrição e preço.
 * - Caso não existam produtos, mostra uma mensagem amigável ao usuário.
 *
 * @async
 * @function carregarCardapio
 * @returns {<void>} Não retorna dados, apenas manipula o DOM.
 */

export async function carregarCardapio() {
    const grid = document.getElementById('cardapio-grid');
    if (!grid) return; // Verifica se o elemento existe

    try {
        const produtos = await buscarProdutos(); // Busca os produtos

        // Se não houver produtos
        if (!produtos || produtos.length === 0) {
            grid.innerHTML = '<p class="text-center col-span-3 text-red-500">Nenhum produto cadastrado no momento.</p>';
            return;
        }

        grid.innerHTML = '';

        produtos.forEach(produto => {
            const cardHtml = `
                <div class="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transform transition-transform hover:scale-105">
                    <img src="${produto.imagem_url}" alt="${produto.nome}" class="bg-gray-200 h-56 w-full object-cover">
                    
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-black mb-2">${produto.nome}</h3>
                        <p class="text-gray-600 mb-4">${produto.descricao}</p>
                        <span class="text-2xl font-bold text-black">${formatarPreco(produto.valor)}</span>
                    </div>
                </div>
            `;
            // Adiciona na tela
            grid.innerHTML += cardHtml;
        });

    } catch (err) {
        console.error("Erro ao carregar cardápio:", err);
        grid.innerHTML = `<p class="text-center col-span-3 text-red-500">Erro ao carregar o cardápio.</p>`;
    }
}