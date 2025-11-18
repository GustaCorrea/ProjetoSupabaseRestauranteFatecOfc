/**
 * @file auths.js
 * @description  Este arquivo contém três import login, logout, signup
 * e as funções loginUi, logoutUi, signUpUi
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */

import { login, logout, signup } from "../module/auth.js";


/**
 * Gerencia o fluxo de login da aplicação.
 *
 * - Captura o envio do formulário.
 * - Valida se email e senha foram preenchidos.
 * - Exibe alertas de erro usando SweetAlert.
 * - Chama a função `login()` do módulo de autenticação.
 * - Redireciona o usuário para o menu se o login for bem-sucedido.
 *
 * @function loginUi
 * @returns {void} Não retorna nada; apenas controla o DOM e navegação.
 */

export function loginUi(){
    const form = document.getElementById('formLogin')
    if (!form) return 

    form.addEventListener('submit', async(e) => {
        e.preventDefault() //evita recarregar
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        if(!email || !password){
            Swal.fire({
                icon: 'error',
                title: 'erro de login',
                text: 'É obrigatório informar o email e a senha para fazer o login',
                confirmButtonText: 'Tentar novamente'
            })
            return
        }
        try{
            await login(email, password)
            await Swal.fire({
                icon: 'success',
                title: 'Login bem sucedido!',
                text: 'Redirecionando para o menu...',
                showConfirmButton: false,
                timer: 1500
            })
            window.location.href = 'menu.html'
        } catch (err){
             Swal.fire({
                icon: 'error',
                title: 'Erro ao efetuar o login',
                text: err.msg || 'Erro no login',
                confirmButtonText: 'Tentar novamente'
             })
        }
    })
}


/**
 * Associa o botão de logout à função responsável por encerrar a sessão.
 *
 * - Localiza o botão #btnLogout
 * - Ao clicar, chama a função logout() importada
 *
 * @function logoutUi
 * @returns {void} Modifica apenas o DOM e dispara o processo de logout.
 */

export function logoutUi(){
    document.getElementById('btnLogout').addEventListener('click', logout)
}


/**
 * Controla o fluxo de criação de novos usuários.
 *
 * - Captura o envio do formulário de cadastro.
 * - Lê os campos email e senha.
 * - Chama `signup()` do módulo de autenticação.
 * - Exibe alertas de sucesso ou erro.
 * - Redireciona para a tela de login após o cadastro.
 *
 * @function signUpUi
 * @returns {void} Manipula DOM e navegação; não retorna valores.
 */

export function signUpUi() {
    const form = document.getElementById("formSignup");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
e.preventDefault(); // impede o reload da página
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
            await signup(email, password);
            await Swal.fire({
                icon: 'success',
                title: 'Usuário criado com sucesso!',
                text: 'Redirecionando para a tela de login...',
                showConfirmButton: false,
                timer: 1500
            });
            window.location.href = "index.html";
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Erro ao criar um novo Usuário',
                text: err.message || 'Ocorreu um erro desconhecido ao tentar criar um novo usuário.',
                confirmButtonText: 'Tentar Novamente',
                timer: 4000
            });
        }
    });
}