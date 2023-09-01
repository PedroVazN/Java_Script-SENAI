// Obtém referências para os elementos HTML
const textoAleatorioDiv = document.getElementById('textoAleatorio');
const iniciarDatilografiaButton = document.getElementById('iniciarDatilografia');
const textoParaDigitarInput = document.getElementById('textoParaDigitar');
const precisaoSpan = document.getElementById('precisao');
const wpmSpan = document.getElementById('wpm');
const errosSpan = document.getElementById('erros');

// Variáveis para armazenar dados relacionados à datilografia
let textoGerado = '';
let palavrasTextoGerado = [];
let palavraAtual = 0;
let textoDigitado = '';
let erros = 0;
let startTime = 0;
let endTime = 0;

// Função para calcular a precisão da datilografia
//Esta função calcula a precisão da datilografia, comparando as palavras digitadas pelo usuário com as palavras geradas aleatoriamente. Ela conta quantas palavras foram digitadas corretamente e retorna a precisão em porcentagem.

function calcularPrecisao() {

    const palavrasTextoDigitado = textoDigitado.split(' ');
    let precisao = 0;

    //Ele irá percorrer cada palavra no texto digitado pelo usuário, uma palavra de cada vez, até o final da lista de palavras (palavrasTextoDigitado).

    for (let i = 0; i < palavrasTextoDigitado.length; i++) {
        if (palavrasTextoGerado[i] && palavrasTextoDigitado[i] === palavrasTextoGerado[i]) {
            precisao++;
        }
    }

    return (precisao / palavrasTextoDigitado.length) * 100;
}

// Função para calcular as palavras por minuto (WPM)
function calcularWPM() {
    const tempoDecorrido = (endTime - startTime) / 60000; // Tempo em minutos
    const palavrasPorMinuto = (palavraAtual / tempoDecorrido).toFixed(2);
    return palavrasPorMinuto;
}

// Função para exibir os resultados da datilografia
function exibirResultados() {
    const precisao = calcularPrecisao().toFixed(2);
    const wpm = calcularWPM();

    precisaoSpan.textContent = precisao + '%';
    wpmSpan.textContent = wpm;
    errosSpan.textContent = erros;
}

// Evento de clique no botão "Iniciar Datilografia"
iniciarDatilografiaButton.addEventListener('click', () => {
    // Limpa os valores anteriores
    precisaoSpan.textContent = '-';
    wpmSpan.textContent = '-';
    errosSpan.textContent = '-';

    // Faz uma solicitação para obter texto aleatório da API de Bacon Ipsum
    fetch('https://baconipsum.com/api/?type=all-meat&paras=1')
        .then((response) => response.json())
        .then((data) => {
            // Armazena o texto gerado e exibe-o na página
            textoGerado = data[0];
            textoAleatorioDiv.innerHTML = `<p>${textoGerado}</p>`;
            palavrasTextoGerado = textoGerado.split(' ');
            textoDigitado = '';
            palavraAtual = 0;
            erros = 0;
            startTime = 0;
            endTime = 0;

            // Habilita o input para a datilografia e define o foco
            textoParaDigitarInput.removeAttribute('disabled');
            textoParaDigitarInput.value = '';
            textoParaDigitarInput.focus();

            // Evento de entrada no campo de digitação
            textoParaDigitarInput.addEventListener('input', () => {
                if (!startTime) {
                    startTime = Date.now();
                }

                //obtém o valor atual do campo de entrada de texto e o armazena na variável textoAtual. Isso representa o que o usuário digitou até o momento.

                const textoAtual = textoParaDigitarInput.value;

                //verifica se o texto atual digitado pelo usuário começa com o texto que já foi digitado anteriormente 
                if (textoAtual.startsWith(textoDigitado)) {
                    const letraAtual = textoAtual[textoDigitado.length];
                    textoDigitado += letraAtual;

                    if (letraAtual === ' ' || letraAtual === 'Enter') {
                        palavraAtual++;
                    }
                } else {
                    erros++;
                }

                // Atualiza os valores de precisão, WPM e erros
                precisaoSpan.textContent = calcularPrecisao().toFixed(2) + '%';
                wpmSpan.textContent = calcularWPM();
                errosSpan.textContent = erros;
            });

            // Evento de pressionar tecla no campo de digitação
            textoParaDigitarInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && !endTime) {
                    endTime = Date.now();
                    exibirResultados();

                    // Desabilita o input após o término
                    textoParaDigitarInput.disabled = true;
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao obter texto aleatório de bacon:', error);
        });

    // Desabilita o botão "Iniciar Datilografia" após o início
    iniciarDatilografiaButton.disabled = true;

});
