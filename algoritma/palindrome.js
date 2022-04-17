const Palindrome = (kata) => {
    const karakter = kata.toLowerCase().replace(/[^a-z]/g, '').split('');
    if (karakter.join('') === karakter.reverse().join('')) {
    return true; 
} else { 
    return false;
    } 
}
    const hasil = Palindrome("Malam"); 
    console.log(hasil);