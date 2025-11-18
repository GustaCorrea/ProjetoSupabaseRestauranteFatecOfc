/*
 * Criação da tabela "lancamentos" e definição de políticas de segurança (RLS).
 *
 * A tabela "lancamentos" registra os itens adicionados a um pedido,
 * vinculando cada lançamento ao usuário que o criou. 
 * É usada para armazenar produtos selecionados, valores e descrições.
 *
 * Estrutura da tabela:
 * - id: Identificador único (UUID) gerado automaticamente.
 * - user_id: ID do usuário que realizou o lançamento.
 *            - FK para auth.users.
 *            - Preenchido automaticamente com auth.uid().
 * - tipo_id: Categoria do produto (FK para tipo.id).
 * - produto: Nome do produto lançado.
 * - valor: Valor monetário do item (>= 0).
 * - descricao: Texto opcional descrevendo o lançamento.
 *
 * Políticas de segurança (Row Level Security):
 * A tabela utiliza RLS para garantir que cada usuário acesse apenas seus próprios dados.
 *
 * Políticas:
 * - SELECT: Usuários só podem visualizar lançamentos cujo user_id = auth.uid().
 * - INSERT: Permitido apenas a usuários autenticados.
 * - UPDATE: Permitido apenas quando o registro pertence ao usuário.
 * - DELETE: Permitido apenas quando o registro pertence ao usuário.
 */

-- Tabela Lançamentos do pedido
create table if not exists lancamentos (
    id uuid constraint pk_lancamentos primary key default gen_random_uuid(),
    user_id uuid constraint fk_lancamentos_user references auth.users on delete cascade
                 constraint df_lancamentos_user DEFAULT auth.uid(),
    
    tipo_id uuid constraint pk_produtos_tipo references tipo(id) on delete restrict,
    
    produto varchar(100),
    valor numeric(12,2) not null constraint ck_lancamentos_valor check (valor >= 0),
    descricao varchar(200),
);


-- Políticas

alter table lancamentos enable row level security;

-- SELECT
CREATE POLICY "Permitir SELECT apenas para o próprio usuário"
ON lancamentos
FOR SELECT
USING (auth.uid() = user_id);

-- INSERT
CREATE POLICY "Permitir INSERT para usuários autenticados"
ON lancamentos
FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Permitir UPDATE apenas para o próprio usuário"
ON lancamentos
FOR UPDATE
USING (auth.uid() = user_id);

-- DELETE
CREATE POLICY "Permitir DELETE apenas para o próprio usuário"
ON lancamentos
FOR DELETE
USING (auth.uid() = user_id);