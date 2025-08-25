// Lista de números já sorteados (evita repetição)
let listaNumerosSorteados = [];
// Limite máximo para o número secreto (1 até 100)
let limiteNumeroSorteado = 100;
// Contador de tentativas do jogador
let tentativas = 1;

// -----------------------------------
// Função que gera e retorna um número aleatório
// entre 1 e limiteNumeroSorteado, sem repetição
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeroSorteado + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    // Se todos os números já foram sorteados, zera a lista
    if (quantidadeElementosLista == limiteNumeroSorteado) {
        listaNumerosSorteados = [];
    }

    // Verifica se o número já foi sorteado antes
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        // Se já foi sorteado, chama a função de novo (recursão)
        return gerarNumeroAleatorio();
    } else {
        // Se for novo, adiciona à lista e retorna
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Armazena o número secreto inicial
numSecreto = gerarNumeroAleatorio();

// -----------------------------------
// Insere texto em uma tag HTML e fala o texto usando Web Speech API
function inserirTextoHtml(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Verifica se o navegador suporta síntese de voz
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';  // Idioma: Português do Brasil
        utterance.rate = 1.2;      // Velocidade da fala
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

// Exibe título e instrução inicial na tela
function exibirMensagemInicial() {
    inserirTextoHtml('h1', 'Jogo do Número Secreto!');
    inserirTextoHtml('p', 'Digite um número entre 1 e 100:');    
}

// Mostra a mensagem inicial ao carregar o jogo
exibirMensagemInicial()

// -----------------------------------
// Função chamada ao verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value;

    // Se o chute for igual ao número secreto → jogador venceu
    if (chute == numSecreto) {
        let mensagemTentativas = `Isso aí, você ACERTOU em ${tentativas} ${tentativas == 1? "tentativa" : "tentativas"}!`
        inserirTextoHtml('h1', mensagemTentativas); 
        inserirTextoHtml('p', 'Clique em "Novo Jogo" para recomeçar.'); 
        
        // Habilita o botão de reinício
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Se o chute for maior que o número secreto → dica: é menor
        if (chute > numSecreto) {
            inserirTextoHtml('p', `O número secreto é menor.`);   
        } 
        // Se o chute for menor que o número secreto → dica: é maior
        else {
            inserirTextoHtml('p', `O número secreto é maior.`);
        }
        // Conta mais uma tentativa
        tentativas++;
        // Limpa o campo de entrada para o próximo chute
        limparCampo(); 
    }
}

// -----------------------------------
// Função que limpa o campo de entrada
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = "";
}

// -----------------------------------
// Reinicia o jogo para nova partida
function reiniciarJogo() {
    // Gera um novo número secreto
    numSecreto = gerarNumeroAleatorio();

    // Limpa campo de entrada
    limparCampo();

    // Reseta contador de tentativas
    tentativas = 1;

    // Mostra mensagem inicial novamente
    exibirMensagemInicial();

    // Desabilita o botão de reinício até o jogador acertar
    document.getElementById('reiniciar').setAttribute('disabled', true);
}