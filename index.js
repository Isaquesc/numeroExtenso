
const numeroAtual = document.querySelector("#inputNatual")
const numeroExtenso = document.getElementById("inputExtenso")
const unidade = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
const dezena = ['vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
const centena = ['cem', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']
const ex = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']

let string = []

window.addEventListener('load', test)

function test() {
    const escolhaNumero = document.getElementById("inputEn")
    escolhaNumero.addEventListener('input', pegaValor)
}

function pegaValor() {
    numeroExtenso.value = ''
    let numero = event.target.value
    numeroAtual.value = numero
    isNumber(numero)
}

function isNumber(numero) {
    let comprimento = numero.length
    string = [];

    if (comprimento === 3) {
        validadorCentena(numero, centena)
    } else if (comprimento === 2) {
        validadorDezena(numero, ex)
    } else {
        validadorUnidade(numero, unidade)
    }
}

function validadorUnidade(n, l) {
    extenso(l[n])
}

function extenso(e) {
    string.push(e)
    numeroExtenso.value = string.join(' e ')
}

function validadorDezena(n, l) {
    if ((n >= 10) && (n <= 19)) {
        extenso(l[n.slice(-1)])
    } else if (l = dezena) {
        extenso(l[n.substr(0, 1) - 2])
        l = unidade
        if (n.slice(-1) !== '0') {
            extenso(l[n.slice(-1)])
        }
    }
}

function validadorCentena(n, l) {
    if (n === '100') {
        extenso(l[0])
    } else {
        extenso(l[n.substr(0, 1)])                                         // se numero é centena pega o valor dele 'cento' 100 200 300
        if ((n.substr(1, 1) === '0') && !(n.substr(2, 1) === "0")) {      // se o numero do meio é 0 pegue o valor da unidade
            l = unidade
            extenso(l[n.substr(2, 1)])
        }
        if (n.substr(1, 1) === '1') {                                       // se o numero do meio é 1 pegue o valor dos ex
            l = ex                                                          // cento e doze
            extenso(l[n.slice(-1)])
        }
        if (n.substr(1, 1) > '1') {                                         // se o numero do meio é maior que 1 pegue o valor das dezenas
            l = dezena                                                      // cento e vinte 122
            extenso(l[n.substr(1, 1) - 2])                                  // ['vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
            l = unidade                                                     // adiciona as unidades as dezenas
            if (n.slice(-1) !== '0') {
                extenso(l[n.slice(-1)])
            }
        }
    }
}