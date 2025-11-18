/*
 * Situação inicial da tabela "tipo".
 *
 * Este script insere os tipos básicos de categoria utilizados
 * para classificar produtos no sistema.
 *
 * Campos inseridos:
 * - descricao: Nome da categoria do produto.
 *
 * Tipos cadastrados:
 * 1. Principal
 * 2. Entrada
 * 3. Sobremesa
 * 4. Bebida
 */

insert into tipo (descricao)
values 
    ('Principal'),
    ('Entrada'),
    ('Sobremesa'),
    ('Bebida');
