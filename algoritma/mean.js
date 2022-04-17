var x = [ 1,1,1,1 ]
const getMean = (array) => {
let sum = 0;
array.forEach(num => {
sum += num;
});
const mean = sum / array.length; 
return mean;
}
console.log(getMean(x))