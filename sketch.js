var numeroAtual = 0; // Inicializa o número atual como 0
var proximoNumero; // Próximo número aleatório
var lerping = false; // Flag para indicar se a transição está ocorrendo
var startTime; // Tempo de início da transição
var lerpingDuration = 1; // Duração da transição em segundos
var botao; // Variável para armazenar o botão
var corAtual; // Cor atual de fundo
var corTexto; // Cor do texto

function setup() {
  createCanvas(400, 200); // Cria um canvas com largura 400 e altura 200
  textSize(32); // Define o tamanho do texto como 32
  
  // Cria um botão com o texto "Gerar Número" na posição (150, 150)
  botao = createButton('Gerar Número');
  botao.position(150, 150);
  botao.mousePressed(gerarNumeroAleatorio); // Chama a função gerarNumeroAleatorio quando o botão é clicado
  
  gerarNumeroAleatorio(); // Gera o primeiro número aleatório
}

function draw() {
  background(corAtual); // Define a cor de fundo
  
  if (lerping) {
    var t = (millis() - startTime) / (lerpingDuration * 1000); // Calcula a progressão da transição
    if (t >= 1) {
      lerping = false; // Finaliza a transição quando atinge 100%
      numeroAtual = proximoNumero; // Atualiza o número atual para o próximo número
      corAtual = color(random(255), random(255), random(255)); // Define uma nova cor aleatória
      atualizarCorTexto(corAtual); // Atualiza a cor do texto com base na nova cor de fundo
    } else {
      numeroAtual = lerp(numeroAtual, proximoNumero, t); // Interpola suavemente entre os números
    }
  }

  fill(corTexto); // Define a cor do texto
  text("Número Aleatório: " + Math.floor(numeroAtual), 50, 100); // Exibe o número aleatório na tela
}

function gerarNumeroAleatorio() {
  proximoNumero = Math.floor(random(1, 101)); // Gera um novo número aleatório entre 1 e 100
  lerping = true; // Ativa a transição
  startTime = millis(); // Registra o tempo de início da transição
  corAtual = color(random(255), random(255), random(255)); // Define uma nova cor aleatória
  atualizarCorTexto(corAtual); // Atualiza a cor do texto com base na nova cor de fundo
}

function atualizarCorTexto(cor) {
  // Calcula o brilho da cor de fundo
  var brilho = red(cor) * 0.299 + green(cor) * 0.587 + blue(cor) * 0.114;
  // Define a cor do texto com base no brilho da cor de fundo
  corTexto = brilho > 128 ? color(0) : color(255);
}
