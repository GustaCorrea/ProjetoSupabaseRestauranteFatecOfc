/**
 * @file lancamentos.js
 * @description  Este arquivo contém sete imports uploadImage da file auth.js
 * insertProduto, buscarProdutos, excluirProduto, buscarProdutoPorId, atualizarProduto da file produtos.js
 * e o import buscarTipos da file tipos.js
 * e as funções loginUi, logoutUi, signUpUi.
 * E possui as funções carregarTabelaLancamentos, carregarFormularioLancamento, ativarBotoesAcao
 * @author Gustavo Correa <gustavo.correa11@fatec.sp.gov.br>
 * @author Isabeli Pires Quagliatto <Isabeli.quagliatto@fatec.sp.gov.br>
 * @version 1.1.0
 */


/**
 * Página responsável pelo CRUD de produtos utilizando Supabase.
 * Inclui carregamento de tabela, edição, exclusão e cadastro com upload de imagem.
 */

import { uploadImage } from "../module/auth.js";
import {
    insertProduto,
    buscarProdutos,
    excluirProduto,
    buscarProdutoPorId,
    atualizarProduto
} from "../module/produtos.js";
import { buscarTipos } from "../module/tipos.js";


const form = document.getElementById('formLancamento');
const tbody = document.getElementById('tabelaLancamentos');
const selectTipo = document.getElementById('tipo_id');


/**
 * Carrega a tabela exibindo todos os produtos cadastrados.
 * Obtém os dados do Supabase e insere dinamicamente no DOM.
 * 
 * @async
 * @returns {<void>}
 */

// carrega a tabela com produtos
export async function carregarTabelaLancamentos() {
    const produtos = await buscarProdutos();
    tbody.innerHTML = '';

    if (!produtos || produtos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class='border p-2'><img src="${produto.imagem_url}" alt="${produto.nome}" class="w-16 h-16 object-cover rounded"></td>
            <td class='border p-2'>${produto.nome}</td>
            <td class='border p-2'>${produto.tipo.descricao}</td>
            <td class='border p-2'>R$ ${produto.valor.toFixed(2)}</td>
            <td class='border p-2 flex space-x-2'>

                <button data-id="${produto.id}" class="btn-editar flex items-center fustify-center bg-purple-500 text-white px-3 py-1 rounded">
                    <span class="material-symbols-outlined mr-1">edit_document</span>
                    Editar
                </button>

                <button data-id="${produto.id}"  class="btn-excluir flex items-center fustify-center bg-red-500 text-white px-3 py-1 rounded">
                    <span class="material-symbols-outlined mr-1">delete</span>
                    Excluir
                </button>

            </td>
        `;
        tbody.appendChild(tr);
    });
}


/**
 * Carrega o formulário inserindo os tipos disponíveis e define o comportamento
 * do botão salvar/atualizar.
 * - Se houver um ID no form.dataset, faz atualização
 * - Caso contrário, cria novo produto
 * - Validar os valores para:
 * - nome, descrição e tipo para não nulo
 * - valor para não nulo e apenas número positivos
 * @async
 * @returns {<void>}
 */

// carrega formulario
export async function carregarFormularioLancamento() {

    try {
        const tipos = await buscarTipos();
        selectTipo.innerHTML = '<option value="" disabled selected>Selecione o Tipo</option>';
        tipos.forEach(tipo => {
            selectTipo.innerHTML += `<option value="${tipo.id}">${tipo.descricao}</option>`;
        });
    } catch (err) { console.error("Erro ao carregar tipos:", err); }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const idSendoEditado = form.dataset.id;
        const fileInput = document.getElementById('imagem');
        const file = fileInput.files[0];

        //VALIDAÇÃO
            //valor
            const valor = parseFloat(document.getElementById('valor').value);

            // valida se é número
            if (isNaN(valor)) {
                Swal.fire('Erro', 'O valor deve ser um número válido.', 'error');
                return;
            }

            // valida se é positivo
            if (valor <= 0) {
                Swal.fire('Erro', 'O valor deve ser maior que zero.', 'error');
                return;
            }

            //nome
            const nome = document.getElementById('nomeProd').value.trim();

             if (!nome) {
                Swal.fire('Erro', 'O nome do produto é obrigatório.', 'error');
                return;
            }

            //descrição
            const descricao = document.getElementById('descricao').value.trim();

            if (!descricao) {
                Swal.fire('Erro', 'A descrição é obrigatória.', 'error');
                return;
            }

            //tipo
            const tipo_id = document.getElementById('tipo_id').value;

            if (!tipo_id) {
                Swal.fire('Erro', 'Selecione um tipo.', 'error');
                return;
            }


        if (!idSendoEditado && !file) {
            Swal.fire('Erro', 'A imagem é obrigatória ao criar um novo produto.', 'error');
            return;
        }

        try {
            let publicURL = null;
            if (file) {
                publicURL = await uploadImage(file);
            }
            const produto = {
                nome: document.getElementById('nomeProd').value,
                tipo_id: document.getElementById('tipo_id').value,
                descricao: document.getElementById('descricao').value,
                valor: parseFloat(document.getElementById('valor').value),
            };
            if (publicURL) {
                produto.imagem_url = publicURL;
            }
            if (idSendoEditado) {
                await atualizarProduto(idSendoEditado, produto);
                Swal.fire('Sucesso!', 'Produto atualizado.', 'success');
            } else {
                await insertProduto(produto);
                Swal.fire('Sucesso!', 'Produto cadastrado.', 'success');
            }
            form.reset();
            delete form.dataset.id; 
            document.getElementById('form-titulo').textContent = 'Novo Lançamento';
            document.getElementById('btnSalvar').textContent = 'Salvar';
            await carregarTabelaLancamentos();
        } catch (err) {
            Swal.fire('Erro', `Ocorreu um erro: ${err.message}`, 'error');
        }
    });
}


/**
 * Ativa os botões de ação da tabela (Editar / Excluir).
 * Esses botões são criados dinamicamente, então o evento é enviado ao <tbody>.
 * @returns {void}
 */

// ativa os botoes de açao
export function ativarBotoesAcao() {
    tbody.addEventListener('click', async (e) => {

        // excluir
        if (e.target.classList.contains('btn-excluir')) {
            const id = e.target.dataset.id;

            // SweetAlert
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter isso!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    await excluirProduto(id);
                    await Swal.fire('Excluído!', 'O produto foi excluído.', 'success');
                    await carregarTabelaLancamentos();
                } catch (err) {
                    Swal.fire('Erro!', err.message, 'error');
                }
            }
        }

        // editar
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.dataset.id;

            try {
                const produto = await buscarProdutoPorId(id);

                document.getElementById('nomeProd').value = produto.nome;
                document.getElementById('tipo_id').value = produto.tipo.id;
                document.getElementById('descricao').value = produto.descricao;
                document.getElementById('valor').value = produto.valor;

                form.dataset.id = id; 

                document.getElementById('form-titulo').textContent = `Editando: ${produto.nome}`;
                document.getElementById('btnSalvar').textContent = 'Atualizar';

                window.scrollTo(0, 0);

            } catch (err) {
                Swal.fire('Erro!', `Não foi possível carregar o produto: ${err.message}`, 'error');
            }
        }
    });
}