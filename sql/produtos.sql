/*
 * Criação da tabela "produto" e definição das políticas de segurança (RLS).
 *
 * A tabela "produto" armazena os produtos disponíveis no sistema,
 * contendo informações como nome, tipo, valor, descrição e imagem.
 *
 * Estrutura da tabela:
 * - id: Identificador único (UUID), gerado automaticamente.
 * - nome: Nome do produto (obrigatório e único).
 * - tipo_id: Identificador da categoria do produto (FK para tipo.id).
 * - valor: Preço do produto.
 * - descricao: Texto opcional descrevendo o produto.
 * - imagem_url: URL opcional de imagem vinculada ao produto.
 *
 * Segurança (Row Level Security - RLS):
 * RLS é habilitado para garantir controle de acesso às operações.
 *
 * Políticas:
 * 1. SELECT — leitura pública permitida a qualquer usuário.
 * 2. INSERT — permitido apenas a usuários autenticados.
 * 3. DELETE — permitido apenas a usuários autenticados.
 * 4. UPDATE — permitido apenas a usuários autenticados.
 *
 * Observações:
 * - A tabela permite consulta pública, mas somente usuários autenticados podem alterar dados.
 */

create table produto(
    id uuid constraint pk_produtos primary key 
            constraint df_produtos_id default gen_random_uuid(),
    
    nome varchar(100) not null
            constraint uk_produtos_nome unique,
    
    tipo_id uuid constraint pk_produtos_tipo references tipo(id) on delete restrict,
            /*(tipo in ('entrada','principal', 'sobremesa', 'bebida'))*/
    valor numeric(6, 2),
    descricao varchar(200)
);

alter table produto enable row level security;

create policy "Permitir leitura pública dos produtos"
on produto for select using (true);

create policy "Bloquear alterações nos produtos"
on produto for all using (false) with check(false);
-- Apague a política de bloqueio
DROP POLICY "Bloquear alterações nos produtos" ON produto;

-- Crie uma política que permite INSERIR se você estiver logado
CREATE POLICY "Permitir INSERT para usuários autenticados"
ON produto
FOR INSERT
TO authenticated
WITH CHECK (true);

ALTER TABLE produto
ADD COLUMN imagem_url TEXT;

CREATE POLICY "Permitir DELETE para usuários autenticados"
ON produto
FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Permitir UPDATE para usuários autenticados"
ON produto
FOR UPDATE
TO authenticated
USING (true);