function cifrar(palavra){
    const alfabeto = 
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "z"]
    const vogais = 
    ["a", "e", "i", "o", "u"]
    const letras = palavra.split("")
    let palavra_cifrada = new Array()

    letras.forEach(letra => {
        let index = alfabeto.indexOf(letra);
        if(vogais.includes(letra)){
            palavra_cifrada.push(letra)
        } 
        else{
            palavra_cifrada.push(letra)
            if(letra == "z"){             //caso especial, tive que trata-lo individualmente
                palavra_cifrada.push("u")
                palavra_cifrada.push("z") 
            } else {
                let l = index - 1
                let r = index + 1
                while(true){
                    if(vogais.includes(alfabeto[l]) && vogais.includes(alfabeto[r])) {
                        if(Math.abs(index - l) < Math.abs(index - r)) {
                            palavra_cifrada.push(alfabeto[l])
                            break
                        } else if (Math.abs(index - l) > Math.abs(index - r)) {
                            palavra_cifrada.push(alfabeto[r])
                            break
                        } else {
                            if(alfabeto.indexOf(alfabeto[l]) < alfabeto.indexOf(alfabeto[r])) {
                                palavra_cifrada.push(alfabeto[l])
                            } else {
                                palavra_cifrada.push(alfabeto[r])
                            }
                            break
                        }
                    }

                    if(!vogais.includes(alfabeto[l])) l--
                    if(!vogais.includes(alfabeto[r])) r++
                }
                let p = index + 1
                while(true){
                    if(vogais.includes(alfabeto[p])){
                        p++
                    }
                    else{
                        palavra_cifrada.push(alfabeto[p])
                        break
                    }
                }
            }
        }
    });

    return palavra_cifrada.join("")
}

console.log(cifrar("marcus"));
