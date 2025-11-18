/**
 * @file auth.js
 * @description  Este arquivo contém um import do Objeto supabase
 *  e as funções para login, logout, verificaAutenticacao e signup e uploadImage.
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */

import { supabase } from "./config.js";


/**
 * Realiza o login de um usuário utilizando o Supabase Authentication.
 *
 * @async
 * @function login
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {<Object>} Retorna os dados da sessão e do usuário autenticado.
 * @throws {Error} Caso o Supabase retorne erro na autenticação.
 *
 * @example
 * const user = await login("usuario@email.com", "senha123");
 */

// login
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    if (error) throw new Error(error.message);
    localStorage.setItem('sb_token', data.session.access_token);
    return data;
}


/**
 * Faz logout do usuário removendo o token e redirecionando para a página inicial.
 *
 * @function logout
 * @returns {void}
 */

// logout
export function logout() {
    localStorage.removeItem('sb_token');
    window.location.href = 'index.html';
}


/**
 * Verifica se o usuário está autenticado através do token armazenado.
 *
 * @function verificaAutenticacao
 * @returns {boolean} `true` se autenticado, `false` se não e redireciona para login.
 *
 * @example
 * if (!verificaAutenticacao()) return;
 */

// verifica autenticação
export function verificaAutenticacao() {
    const token = localStorage.getItem('sb_token');
    if (!token) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}


/**
 * Cria um novo usuário no Supabase Authentication.
 *
 * @async
 * @function signup
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {<Object>} Dados do usuário criado.
 * @throws {Error} Caso ocorra erro no cadastro.
 */

// novo usuário
export async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if (error) throw new Error(error.message);
    return data;
}


/**
 * Faz upload de uma imagem para o bucket 'imagens' do Supabase Storage.
 *
 * @async
 * @function uploadImage
 * @param {File} file - Arquivo de imagem enviado pelo usuário.
 * @returns {<string>} URL pública da imagem armazenada.
 * @throws {Error} Se houver falha no upload.
 *
 * @example
 * const url = await uploadImage(input.files[0]);
 */

// upload de imagem
export async function uploadImage(file) {
    // Cria um nome de arquivo único 
    const fileName = `${Date.now()}-${file.name}`;

    // Faz o upload para o bucket 'imagens' no supabase
    const { data, error } = await supabase.storage
        .from('imagens')
        .upload(fileName, file);

    if (error) {
        console.error("Erro no upload:", error);
        throw new Error(error.message);
    }

    // Pega a URL pública da imagem
    const { data: publicData } = supabase.storage
        .from('imagens')
        .getPublicUrl(fileName);

    return publicData.publicUrl;
}