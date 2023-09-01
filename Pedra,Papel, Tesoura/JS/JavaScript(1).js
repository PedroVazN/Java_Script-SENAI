
let pontuacaoUsuario = 0;
let pontuacaoComputador = 0;

function jogar() {
    // Array 
    const opcoes = ["PEDRA", "PAPEL", "TESOURA"];

    // Gera uma escolha aleatória para o jogador.
    const escolhaUsuario = Math.floor(Math.random() * 3);

    // Array contendo os caminhos das imagens correspondentes às opções.
    const imagens = ["./Images/pedra.png", "./Images/papel.png", "./Images/tesoura.png"];

    // Atualiza a imagem exibida para a escolha do jogador.
    const imagemJogadorElement = document.getElementById("imagemJogador");
    imagemJogadorElement.src = imagens[escolhaUsuario];

    // Gera uma escolha aleatória para o computador.
    const escolhaComputador = Math.floor(Math.random() * 3);

    // Atualiza a imagem exibida para a escolha do computador.
    const imagemComputadorElement = document.getElementById("imagemComputador");
    imagemComputadorElement.src = imagens[escolhaComputador];

    // Chama a função determinarResultado para obter o resultado da rodada.
    const resultado = determinarResultado(escolhaUsuario, escolhaComputador);

    // Atualiza o elemento HTML para exibir o resultado da rodada.
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = resultado;

    // Atualiza as pontuações do jogador e do computador com base no resultado.
    if (resultado == "Você venceu!") {
        pontuacaoUsuario += 1;
    } else {
        pontuacaoUsuario += 0;
    }

    if (resultado == "Computador venceu!") {
        pontuacaoComputador += 1;
    } else {
        pontuacaoComputador += 0;
    }

    // Atualiza o elemento HTML para exibir a pontuação atualizada.
    const pontuacaoElement = document.getElementById("pontuacao");
    pontuacaoElement.innerHTML = "Pontuação: " + pontuacaoUsuario + " - " + pontuacaoComputador;
}

// Função que determina o resultado da rodada com base nas escolhas do jogador e do computador.
function determinarResultado(escolhaUsuario, escolhaComputador) {
    if (escolhaUsuario == escolhaComputador) {
        return "Empate!";
x       } else if (
        (escolhaUsuario == 0 && escolhaComputador == 2) ||
        (escolhaUsuario == 1 && escolhaComputador == 0) ||
        (escolhaUsuario == 2 && escolhaComputador == 1)
    ) {

        return "Você venceu!";
    } else {
        return "Computador venceu!";
    }
}


// Função para zerar a pontuação.
function zerarPontuacao() {
    pontuacaoUsuario = 0;
    pontuacaoComputador = 0;

    // Atualiza o elemento HTML para exibir a pontuação zerada.
    const pontuacaoElement = document.getElementById("pontuacao");
    pontuacaoElement.innerHTML = "Pontuação: " + pontuacaoUsuario + " - " + pontuacaoComputador;
}
