//Função para capturar a posição do clique do mouse dentro do canvas
function pegaPosicaoMouse(canvas, evt){
    // pega posição no canvas
    var obj = canvas;
    
    var top = 0;
    var left = 0;
    //Laço para delimitar que o clique do mouse só terá efeito dentro da 
    //área do canvas e não no body da página
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    
    // retorna a posição relativa do mouse
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}

//FUNÇÃO INICIAL DE CARREGAMENTO

window.onload = function(){
    //Captura do botão de Apagar Marcações
    var botao_apaga = document.getElementById('apaga');
    //Cria área do canvas onde vai ser carregada a imagem da planta
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    //Captura evento de click do mouse dentro do canvas
    canvas.addEventListener('click', function(evt){
        //Desabilita o botão ver reservas
        document.getElementById("ver_reservas").disabled = false;
        //Chama a função para capturar a posição do clique do mouse
        //e devolve a posição X,Y clicada
        var mousePos = pegaPosicaoMouse(canvas, evt);
        
        //desenha quadrado de 10 x 10 em torno do ponto central marcado
        context.strokeStyle = 'red';
        //Marca a posição central descontando a área do quadrado
        var x = mousePos.x-5;
        var y = mousePos.y-5;
        var tam = 10;
        //Desenha um retângulo
        context.strokeRect(x,y,tam,tam);
        
        //Atribui as posições X,Y e insere nos inputs
        document.getElementById('posX').setAttribute('value',x);
        document.getElementById('posY').setAttribute('value',y);
        
        //Função para criar a lista de reservas marcadas na planta
        criareserva(x,y);
    }, 
    false);
};
    
//Cria uma matriz de 2 linhas (linha 0 => X, linha 1 => Y) 
var reservas = new Array(2);
reservas[0] = new Array();
reservas[1] = new Array();

function criareserva(x,y){
    //Adiciona na última posição do vetor as coordenadas
    reservas[0].push(x);
    reservas[1].push(y);
    let tamx = reservas[0].length;
    tamy = reservas[1].length;

    //os tamanhos de x e y devem ser iguais então basta pegar só de um deles
        
    //console.log('X -> ' + reservas[0]);
    //console.log('Y -> ' + reservas[1]);
    //console.log('Tamanho do vetor -> ' + tamx);

}

//Função para criar as reservas e exibir => cria em criarlista
function mostrar(){
    var dono = document.querySelector('#nome'); //selecione o input que recebeu o nome de quem reservou
    var dono_nome = dono.value; //pega o valor e atribui para a variavel dono_nome
    document.getElementById("dono").setAttribute("value", dono_nome); //exibe em reservas o nome do reservante
    var itens = reservas[0].length;
    //console.log(reservas);
    for(let lin=0 ; lin<2 ; lin++){
        for(let col=0; col<itens ; col++){
            if (lin < 1){
                valorX = reservas[lin][col];
                valorY = reservas[lin+1][col]; 
                crialista(valorX,valorY,itens);
            }
        }
    }
}

//Nesta função ele recupera as coordenadas inseridas no vetor reservas
function crialista(a,b,c){ //cria uma lista de li
    //cria dinamicamente os elementos li para mostrar cada uma das reservas
    var novoElem  = document.createElement('li');
    //as posições X e Y, são nomeadas como a e b
    var texto     = document.createTextNode('(' + a + " , " + b + ' )');
    novoElem.appendChild(texto);
    
    // Recuperando a lista
    var lista = document.getElementsByTagName('ol')[0];
    // Recuperando os itens
    var itens = document.getElementsByTagName('li');
    // Inserindo com insertBefore()
    lista.insertBefore(novoElem, itens[0]);


}

//Função que é chamada sempre que uma nova planta for selecionada no select inicial
function atualizaImagem() {
    //captura do valor selecionado no select da planta
    var select = document.getElementById("planta");
    var option = select.options[select.selectedIndex];
    var planta_escolhida = option.value;
    let imagem = document.getElementById("myCanvas");
    
    //altera o css do canvas para carregar a nova imagem selecionada
    imagem.style.cssText =
      'background-image: url("img/' + planta_escolhida + '")';
      
}

//Função para desmarcar a última posição selecionada
function desmarca(){
    //habilita o botão ver reservas
    document.getElementById("ver_reservas").disabled = true;
    //console.log(reservas[0]);
    //console.log(reservas[1]);
    
    //guarda a última posição em X e Y antes de apagar
    var pega_ultimo_x = reservas[0].slice(-1).pop();
    var pega_ultimo_y = reservas[1].slice(-1).pop();

    //console.log(pega_ultimo_x);
    //console.log(pega_ultimo_y);
    
    //remove a última posição de X e Y
    reservas[0].pop();
    reservas[1].pop();
    
    //console.log(reservas[0]);
    //console.log(reservas[1]);
    //console.log(reservas.length);

    //chama o canvas novamente para apagar a última posição
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    //apaga última marcação
    context.clearRect(pega_ultimo_x-5, pega_ultimo_y-5, 20,20);
    
    //chama a função para mostrar as reservas atualizadas
    mostrar2();
    
}

//função que mostra as reservas atualizadas após a remoção da última posição
function mostrar2(){
    console.log(reservas);
    var itens = reservas[0].length;
    //zerar a lista de posições
    var myList = document.getElementById('myList');
    myList.innerHTML = '';
    
    for(let lin=0 ; lin<2 ; lin++){
        for(let col=0; col<itens ; col++){
            if (lin < 1){
                valorX = reservas[lin][col];
                valorY = reservas[lin+1][col]; 
                crialista(valorX,valorY,itens);
            }
        }
    }
}

