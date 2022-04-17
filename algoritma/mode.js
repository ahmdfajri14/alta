var x = [ 1,2,3,2,5,2,7,2 ]
const getMode = (array) => {
var modeObj = {};
// create modeObj
array.forEach(num => {
if (!modeObj[num]) { modeObj[num] = 0;
}
modeObj[num]++;
});
// create array of mode/s
var maxFrequency = 0;
var modes = [];
for (let num in modeObj) {
if (modeObj[num] > maxFrequency) {
modes = [num];
maxFrequency = modeObj[num];
}
else if (modeObj[num] === maxFrequency) { 
    modes.push(num);
}
}
// if every value appears same amount of times
if (modes.length === Object.keys(modeObj).length) { 
    modes = [];
}
return modes;
}
console.log(getMode(x))