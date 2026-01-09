// Seleciona o input de pesquisa
const inputPesquisa = document.querySelector('input[placeholder="Pesquisar estação"]');

if (inputPesquisa) {
    inputPesquisa.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const cidade = inputPesquisa.value;
            buscarDadosPython(cidade);
        }
    });
}

async function buscarDadosPython(cidade) {
    try {

        const resposta = await fetch(`http://127.0.0.1:5000/consultar?cidade=${cidade}`);
        const dados = await resposta.json();

        if (dados.sucesso) {
            mostrarCard(dados);
        } else {
            alert('Erro: ' + (dados.erro || 'Cidade não encontrada'));
        }
    } catch (erro) {
        console.error('Erro ao conectar:', erro);
        alert('Erro ao conectar com o servidor Python (app.py).');
    }
}

function mostrarCard(dados) {
    document.getElementById('cidade-nome').innerText = dados.cidade;
    document.getElementById('cidade-temp').innerText = Math.round(dados.temperatura);
    document.getElementById('cidade-desc').innerText = dados.descricao;
    document.getElementById('cidade-umid').innerText = dados.umidade;

    // Mostra o card
    document.getElementById('card-clima').style.display = 'flex';
}

// --- SISTEMA DE ABAS (TABS) ---

// 1. Pegando os elementos do HTML pelo ID
const btnGeral = document.getElementById('btn-geral');
const btnMapa = document.getElementById('btn-mapa');

const secaoGeral = document.getElementById('secao-geral');
const secaoMapa = document.getElementById('secao-mapa');

// 2. Função para abrir o Mapa de Risco
btnMapa.addEventListener('click', function () {
    // Lógica: Esconde um, mostra o outro
    secaoGeral.style.display = 'none'; // Some a Visão Geral
    secaoMapa.style.display = 'block'; // Aparece o Mapa

    // (Visual) Troca a classe 'ativo' no menu para o botão ficar vermelho
    btnGeral.classList.remove('ativo');
    btnMapa.classList.add('ativo');
});

// 3. Função para voltar para a Visão Geral
btnGeral.addEventListener('click', function () {
    // Lógica: Esconde um, mostra o outro
    secaoMapa.style.display = 'none'; // Some o Mapa
    secaoGeral.style.display = 'block'; // Aparece a Visão Geral

    // (Visual) Troca a classe 'ativo' de volta
    btnMapa.classList.remove('ativo');
    btnGeral.classList.add('ativo');
});