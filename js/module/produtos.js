/**
 * @file produtos.js
 * @description  Este arquivo contém um import supabase
 *  e as funções buscarProdutos, insertProduto, atualizarProduto, excluirProduto, buscarProdutoPorId.
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */

/**
 * Importa o cliente Supabase configurado.
 * Este objeto permite realizar consultas, inserções, atualizações e exclusões
 * na base de dados do Supabase.
 * 
 * @module supabase
 */

import { supabase } from "./config.js";


/**
 * Busca todos os produtos cadastrados no banco, incluindo os dados do tipo relacionado.
 * Utiliza a tabela 'produto' no Supabase.
 *
 * @async
 * @function buscarProdutos
 * @returns {<Array>} Retorna uma lista de produtos com informações completas.
 * @throws {Error} Caso ocorra falha na consulta ao Supabase.
 */

// buscar produto
export async function buscarProdutos() {
    const { data, error } = await supabase
        .from('produto')
        .select(`
            id, nome, descricao, valor, imagem_url,
            tipo ( id, descricao ) 
        `);

    if (error) throw new Error(error.message);
    return data;
}


/**
 * Insere um novo produto no banco.
 *
 * @async
 * @function insertProduto
 * @param {Object} produto - Objeto contendo os dados do produto.
 * @param {string} produto.nome - Nome do produto.
 * @param {string} produto.descricao - Descrição do produto.
 * @param {number} produto.valor - Valor numérico do produto.
 * @param {string} [produto.imagem_url] - URL da imagem enviada (opcional).
 * @param {number} produto.id_tipo - ID da categoria/tipo do produto.
 * @returns {<Object>} Retorna o produto inserido.
 * @throws {Error} Caso ocorra falha no insert.
 */

// inserir produto
export async function insertProduto(produto) {
    const { data, error } = await supabase
        .from('produto')
        .insert(produto)
        .select();

    if (error) throw new Error(error.message);
    return data;
}


/**
 * Atualiza um produto existente na tabela 'produto'.
 *
 * @async
 * @function atualizarProduto
 * @param {number} id - ID do produto a ser atualizado.
 * @param {Object} produto - Campos que devem ser atualizados.
 * @returns {<Object>} Objeto do produto atualizado.
 * @throws {Error} Caso ocorra falha na atualização.
 */

// editar
export async function atualizarProduto(id, produto) {
    const { data, error } = await supabase
        .from('produto')
        .update(produto)
        .eq('id', id)
        .select();
        
    if (error) throw new Error(error.message);
    return data;
}


/**
 * Remove um produto da tabela pelo ID.
 *
 * @async
 * @function excluirProduto
 * @param {number} id - ID do produto a ser removido.
 * @returns {<Object>} Dados retornados pelo Supabase após a exclusão.
 * @throws {Error} Caso ocorra falha ao excluir.
 */

// excluir
export async function excluirProduto(id) {
    const { data, error } = await supabase
        .from('produto')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
}


/**
 * Busca apenas um produto pelo ID, incluindo informações do tipo.
 *
 * @async
 * @function buscarProdutoPorId
 * @param {number} id - ID do produto desejado.
 * @returns {Promise<Object>} O produto encontrado.
 * @throws {Error} Caso o produto não exista ou ocorra erro no Supabase.
 */

export async function buscarProdutoPorId(id) {
    const { data, error } = await supabase
        .from('produto')
        .select(`*, tipo(id, descricao)`)
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
}