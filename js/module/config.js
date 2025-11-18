/**
 * @file config.js
 * @description  Este arquivo contém um import da função createCliente da biblioteca do Supabase
 *  e URL pública do projeto (SUPABASE_URL), uma chave pública do supabase (API_KEY) 
 * e um objeto do cliente supabase (supabase).
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */

/**
 * Importa a função createClient do SDK oficial do Supabase.
 * Este módulo é responsável por configurar e exportar a instância do cliente
 * utilizada no restante da aplicação.
 */

// 1. Importa função da biblioteca do Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';


/**
 * URL pública do projeto Supabase.
 * @constant {string}
 */

// 2. variáveis
const SUPABASE_URL = "https://gmseucsfviezegedvonj.supabase.co";

/**
 * Chave pública (anon) do Supabase, utilizada para operações no lado do cliente.
 * @constant {string}
 */

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdtc2V1Y3NmdmllemVnZWR2b25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MjU0OTUsImV4cCI6MjA3ODMwMTQ5NX0.M8LxtSi-AgTZB6roYYqpU5egQhQcF0vZ2HwNgpDL7CY";

/**
 * Cria e exporta uma instância configurada do cliente Supabase.
 * Essa instância será usada para executar todas as operações de autenticação,
 * banco de dados e storage dentro do sistema.
 *
 * @constant {SupabaseClient}
 */

// 3. Cria o objeto supabase com a url e a chave da API
export const supabase = createClient(SUPABASE_URL, API_KEY);