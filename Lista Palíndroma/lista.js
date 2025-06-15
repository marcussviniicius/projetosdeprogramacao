let l = [10, 60, 20, 40, 10]

function Contracao(l, i){            
    l.splice(i, 2, l[i] + l[i + 1])
    return l
}

function Main(l){
    let left = 0
    let right = l.length - 1
    let num = 0

    while(left < right){
        if(l[left] == l[right]){
            left++
            right--
        } else if(l[left] > l[right]){
            Contracao(l, right - 1)
            num++
            right--
        } else {
            Contracao(l, left)
            num++
            right--
        }
    }

    return num
}

console.log(Main(l));
