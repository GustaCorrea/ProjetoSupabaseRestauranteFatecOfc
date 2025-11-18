/*
 * Situação inicial da tabela "produto".
 *
 * Este script insere registros de produtos pertencentes a diferentes categorias
 * (tipos), utilizando o campo tipo_id como chave estrangeira.
 *
 * Estrutura dos campos inseridos:
 * - nome: Nome do produto.
 * - tipo_id: Identificador da categoria (FK para a tabela "tipo").
 * - valor: Preço do produto (opcional nos registros abaixo).
 * - descricao: Texto descritivo do produto (opcional nos registros abaixo).
 *
 * Grupos de produtos inseridos:
 * 1. Principais
 * 2. Entradas
 * 3. Sobremesas
 * 4. Bebidas
 */

insert into produto (nome, tipo_id, valor, descricao)
values
    -- Principais
    ('Macarrão à Bolonhesa', 1, 25.0, 'Macararrão...'),
    ('Filé à Parmegiana', 1),
    
    -- Entradas
    ('Bolinho de Bacalhau',  2),
    ('Bruschetta de Tomate', 2),
    
    -- Sobremesas
    ('Pudim de Leite', 3),
    ('Mousse de Chocolate', 3),
    
    -- Bebidas
    ('Suco de Laranja', 4),
    ('Água com Gás', 4);