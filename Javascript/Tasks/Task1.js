function analyseString(str){
    str = str.toLowerCase()
    let vowel = 0;
    let digits = 0;
    let alpha = 0;
    for(let i=0; i<+str.length; i++){
        let char = str[i];
        if (char>="a" && char<="z"){
            if(char === "a" || char === "e" || char === "i" || char === "o" || char === "u"){
                vowel++;
            }
            else{
                alpha++;
            }
        }
        else if(char>=0 && char<=9){
            digits++
        }
    }
    return `The digits are ${digits}, the vowels are ${vowel} and the alphabets are ${alpha}`;
}
let output = analyseString("AKJHDGHJHSX12345678");
console.log(output);