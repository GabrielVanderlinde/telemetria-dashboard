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