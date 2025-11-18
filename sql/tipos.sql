/*
 * Criação da tabela "tipo" e definição de política de leitura.
 *
 * A tabela "tipo" armazena as categorias utilizadas para classificar produtos.
 *
 * Estrutura da tabela:
 * - id: Identificador único (UUID), gerado automaticamente.
 * - descricao: Nome da categoria (obrigatório e único).
 *
 * Políticas de Segurança (RLS):
 * - SELECT: Permite leitura pública dos tipos, permitindo que qualquer usuário
 *   visualize as categorias cadastradas.
 */

create table tipo(
        id uuid constraint pk_tipos primary key
                constraint df_tipos_id default gen_random_uuid(),
        descricao varchar(9) not null
                constraint uk_tipo_descricao
);

CREATE POLICY "Permitir leitura pública dos tipos"
ON tipo
FOR SELECT
USING (true);