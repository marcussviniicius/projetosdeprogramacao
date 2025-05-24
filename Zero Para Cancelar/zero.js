function zeroParaCancelar(sequencia){
    let numerosErrados = sequencia.toString().split("").map(Number)
    let numerosCertos = new Array()

    numerosErrados.forEach(num=> {
        numerosCertos.push(num)
        if(num == 0){
            numerosCertos.pop()
            numerosCertos.pop()
        }
    });

    return numerosCertos.reduce((soma, num) => soma + num) // retornando soma
}

console.log(zeroParaCancelar(1354007006));

