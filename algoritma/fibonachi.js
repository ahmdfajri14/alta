const fibo = (urut) => { 
    if (urut < 3) {
    return 1;
    }
    else {
    return fibo(urut-1) + fibo(urut-2); 
    }
}

console.log(fibo(12));

// 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

// function fibonachi(num) {
//     if (num < 1) {
//         return 0;
//     }  else if (num < 2) {
//         return num;
//     } 
//     else {
//         return fibonachi(num - 1) + fibonachi(num - 2) - 1
//     }
// }

// console.log(fibonachi(4))

// const nTerms = 20

// if (nTerms <= 0) {
//     console.log('enter positif')
// } else {
//     for (let i = 0; i < nTerms; i++) {
//         console.log(fibonachi(6))
//     }
// }

