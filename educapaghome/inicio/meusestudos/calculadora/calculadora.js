//  Função insert que recebe um numero de entrada e atualiza o conteudo com uma concatenação
function insert(num) {
    var numero = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = numero + num;
}
// Função para deixar o exibição do resultado em branco
function clean() {
    document.getElementById('resultado').innerHTML = "";
}
// Funçao remover o ultimo caractere do conteudo resultado
function back() {
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length - 1)
}

// Função para exibir o calculo no conteudo resultado, usando if e else para verificar se o 
// conteudo é vazio ou não. Usado também o Eval que avalia o expressão de cadeia de caracteres e retorna seu valor
function calcular() {
    var resultado = document.getElementById('resultado').innerHTML;
    if (resultado) {
        document.getElementById('resultado').innerHTML = eval(resultado)
    }
    else {
        document.getElementById('resultado').innerHTML = "N/A";
    }
}

