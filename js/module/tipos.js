/**
 * @file tipos.js
 * @description  Este arquivo contém um import supabase e função buscarTipos.
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */


import { supabase } from "./config.js";


/**
 * Busca todos os registros da tabela 'tipo' no Supabase.
 *
 * @async
 * @function buscarTipos
 * @returns {<Array>} Retorna uma lista contendo todos os tipos cadastrados.
 * @throws {Error} Lança erro caso a consulta ao Supabase falhe.
 *
 * @example
 * const tipos = await buscarTipos();
 * console.log(tipos); // [{ id: 1, descricao: "Bebida" }, ...]
 */

// buscar tipos
export async function buscarTipos() {
    const { data, error } = await supabase
        .from('tipo')
        .select('*');

    if (error) {
        console.error("Erro ao buscar tipos:", error);
        throw new Error(error.message);
    }
    return data;
}